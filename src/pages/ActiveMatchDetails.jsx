import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../config/axios";
import { createWebSocket } from "../WebSocket";
import { useAuth } from '../providers/AuthProvider'
import ActiveTeamPanel from '../components/ActiveTeamPanel'


function ActiveMatchDetail() {

  const { token } = useAuth();


    const [isSwapped, setIsSwapped] = useState(false);
  
    const handleSwap = () => {
      setIsSwapped(!isSwapped);
    };

  useEffect(() => {
    console.log("active")
    const socket = createWebSocket(`ws://localhost:3000/live?token=${token}`,
     (message) => {
      // if (message.type === 'point added') {
      //   setPoints((prevPoints) => [...prevPoints, message.data]);
      // }
        console.log(message)
    });

    return () => {
      socket.close();
    };
  }, [token]);

  return (
    <div className="flex w-full justify-center my-20">
 <div className="flex">
      {isSwapped ? (
        <>
          <ActiveTeamPanel 
          name={'PGE SKRA'}
          set={2}
          point={24}/>
          <button className="bg-slate-300 h-fit text-white text-4xl pb-2 rounded-xl shadow-lg" onClick={handleSwap}>&#60;=&#62;</button>
          <ActiveTeamPanel
          name={'ASSECO'}
          set={1}
          point={21}/>
        </>
      ) : (
        <>
           <ActiveTeamPanel
           name={'ASSECO'}
           set={1}
           point={21}/>
          <button className="bg-slate-300 h-fit text-white text-4xl pb-2 rounded-xl shadow-lg" onClick={handleSwap}>&#60;=&#62;</button>
          <ActiveTeamPanel
           name={'PGE SKRA'}
           set={2}
           point={24}/>
        </>
      )}
    </div>
    </div>
  );
}

export default ActiveMatchDetail;
