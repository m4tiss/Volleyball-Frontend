import { React, useState, useEffect } from "react";
import axios from "../config/axios";
import { useParams } from "react-router-dom";
import DowngraderAndTimeouts from "./DowngraderAndTimeouts";

function ActiveTeamPanel(props) {

  
  const { matchId } = useParams();


  const onAddPoint = async () => {
    try {
      await axios.post(`/referee/live`, {
        match_id: matchId,
        team_id: props.teamId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };



return (
  <div className="flex mx-5 bg-yellow-400 flex-col w-72 shadow-xl">
    <div className="flex justify-evenly items-center m-2">
      <h2 className="text-3xl">{props.name}</h2>
      <h2 className="text-3xl bg-slate-100 p-2 rounded-lg">{props.set}</h2>
    </div>
    <DowngraderAndTimeouts timeouts={props.timeouts}/>
    <button
    onClick={()=>onAddPoint}
    className="flex justify-center items-center text-9xl
     bg-slate-100 m-2 min-w-52 min-h-52 rounded-xl">{props.point}</button>
  </div>
);
}

export default ActiveTeamPanel;
