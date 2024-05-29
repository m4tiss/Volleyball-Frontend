import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../config/axios";
import { createWebSocket } from "../WebSocket";
import { useAuth } from '../providers/AuthProvider'
import ActiveTeamPanel from '../components/ActiveTeamPanel'


function ActiveMatchDetail() {

  const { token } = useAuth();
  let { matchId } = useParams();
  const [match,setMatch] = useState();


    const [isSwapped, setIsSwapped] = useState(false);
  
    const handleSwap = () => {
      setIsSwapped(!isSwapped);
    };

  useEffect(() => {
    console.log("active")
    const socket = createWebSocket(`ws://localhost:3000/live?token=${token}`,matchId,
     (message) => {
      setMatch(message)
      console.log(message)
    });

    return () => {
      socket.close();
    };
  }, [token]);


  const extractNumbers = (result) => {
    const numbers = result.split(":").map(num => parseInt(num));
    return numbers;
  };

  const extractPoints = (set) => {
    const points = set.split(":").map(num => parseInt(num));
    return points;
  };

  const extractTimeouts = (set_details) => {
    const timeouts = set_details.split(":").map(num => parseInt(num));
    return timeouts;
  };


  return (
    <div className="flex w-full justify-center my-20">
 <div className="flex">
      { match && (isSwapped ? (
        <>
          <ActiveTeamPanel 
          name={match.name_a}
          set={extractNumbers(match.result)[0]}
          point={extractPoints(match.result_detailed.resD[match.result_detailed.resD.length - 1])[0]}
          teamId={match.teama_id}
          timeouts={extractTimeouts(match.result_detailed.timeout[match.result_detailed.timeout.length - 1])[0]}
          />
          <button className="bg-slate-300 h-fit text-white text-4xl pb-2 rounded-xl shadow-lg" onClick={handleSwap}>&#60;=&#62;</button>
          <ActiveTeamPanel
          name={match.name_b}
          set={extractNumbers(match.result)[1]}
          point={extractPoints(match.result_detailed.resD[match.result_detailed.resD.length - 1])[1]}
          teamId={match.teamb_id}
          timeouts={extractTimeouts(match.result_detailed.timeout[match.result_detailed.timeout.length - 1])[1]}
          />
        </>
      ) : (
        <>
           <ActiveTeamPanel
           name={match.name_b}
           set={extractNumbers(match.result)[1]}
           point={extractPoints(match.result_detailed.resD[match.result_detailed.resD.length - 1])[1]}
           teamId={match.teamb_id}
           timeouts={extractTimeouts(match.result_detailed.timeout[match.result_detailed.timeout.length - 1])[1]}
           />
          <button className="bg-slate-300 h-fit text-white text-4xl pb-2 rounded-xl shadow-lg" onClick={handleSwap}>&#60;=&#62;</button>
          <ActiveTeamPanel
           name={match.name_a}
           set={extractNumbers(match.result)[0]}
           point={extractPoints(match.result_detailed.resD[match.result_detailed.resD.length - 1])[0]}
           teamId={match.teama_id}
           timeouts={extractTimeouts(match.result_detailed.timeout[match.result_detailed.timeout.length - 1])[0]}
           />
        </>
      ))}
    </div>
    </div>
  );
}

export default ActiveMatchDetail;
