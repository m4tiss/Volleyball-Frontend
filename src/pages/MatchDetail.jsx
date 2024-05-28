import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import FinishedMacthDetail from "./FinishedMatchDeatil";
import ActiveMatchDetail from "./ActiveMatchDetails"
import axios from "../config/axios";

function MatchDetail() {
  let { matchId } = useParams();

  const [match, setMatch] = useState({});

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const res = await axios.get(`/observator/matches/${matchId}`);
        const matchData = res.data[0];
        setMatch(matchData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMatch();
  }, [matchId]);
  const { status } = match;
  if (status === "FINISHED") {
    return <FinishedMacthDetail/>
  } else {
    return <ActiveMatchDetail/>
  }

}

export default MatchDetail;
