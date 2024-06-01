import React, { useState ,useEffect } from "react";
import MatchPanel from "./MatchPanel";
import { useMatches } from "../providers/MatchProvider";
import { useAuth } from "../providers/AuthProvider";
import axios from "../config/axios";

function MatchList() {

  const[allMatches,setAllMatches] = useState([]);
  const { status } = useMatches();
  const { finishHeader } = useAuth();

    useEffect(() => {
    const fetchData = async () => {
      if(finishHeader){
      try {
        const res = await axios.get(`/observator/matches/all${status === 'ALL' ? '' : `/` + status}`);
        const allMatchesData = res.data;
        allMatchesData.sort((a, b) => new Date(b.match_date) - new Date(a.match_date));
        setAllMatches(allMatchesData);
        console.log(allMatchesData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  }
    fetchData();
  }, [status,finishHeader]);


  return (
    <div className="flex flex-col basis-3/4 items-center gap-10 mb-20">
      <h2 className="text-3xl pt-8">Match list</h2>
      {allMatches.map((match) => (
        <MatchPanel key={match.id} match={match} />
      ))}
    </div>
  );
}

export default MatchList;
