import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FinishedMacthDetail from "./FinishedMatchDeatil";
import ActiveMatchDetail from "./ActiveMatchDetails"
import axios from "../config/axios";
 import { useAuth } from "../providers/AuthProvider";

function MatchDetail() {
  let { matchId } = useParams();


   const { finishHeader } = useAuth()
  const [match, setMatch] = useState({});

  useEffect(() => {
    const abortController = new AbortController();
    const fetchMatch = async () => {
      try {
        const res = await axios.get(`/observator/matches/${matchId}`, {
          signal: abortController.signal,
        });
        const matchData = res.data;
        setMatch(matchData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMatch();
    
    return () => {
      abortController.abort();
    };

  }, [matchId,finishHeader]);
  const { status } = match;

  if (status === "FINISHED") {
    return <FinishedMacthDetail/>
  } else if(status === "IN_PROGRESS" || status === "PLANNED") {
    return <ActiveMatchDetail/>
  }
  else{
    return <div>Loading</div>
   
  }

}

export default MatchDetail;
