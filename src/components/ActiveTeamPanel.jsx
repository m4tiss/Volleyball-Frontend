import { React, useState, useEffect } from "react";
import axios from "../config/axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import DowngraderAndTimeouts from "./DowngraderAndTimeouts";

function ActiveTeamPanel(props) {

  
  const { matchId } = useParams();
  const [isHovered, setIsHovered] = useState(false);
  const [isReferee, setIsReferee] = useState(false);
  const { token } = useAuth();



  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const res = await axios.get(`/auth/user`);
        const user_data = res.data;
        if(user_data.role === "referee")setIsReferee(true);
      } catch (error) {
        setIsReferee(false);
        console.error('Error fetching data:', error);
      }
    };
    fetchUserRole()
  }, [token]);


  const onAddPoint = async () => {
    try {
      await axios.post(`/referee/live/add`, {
        match_id: matchId,
        team_id: props.teamId
      });
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };



return (
  <div className="flex mx-5 bg-yellow-400 flex-col w-72 shadow-xl">
    <div className="flex justify-evenly items-center m-2">
      <h2 
                   onMouseEnter={() => setIsHovered(true)}
                   onMouseLeave={() => setIsHovered(false)}
                   className="text-3xl">{props.name}</h2>
      <h2 className="text-3xl bg-slate-100 p-2 rounded-lg">{props.set}</h2>
    </div>
    <DowngraderAndTimeouts teamId={props.teamId} timeouts={props.timeouts}/>
    <button
    disabled={!isReferee}
    onClick={() => onAddPoint()}
    className="flex justify-center items-center text-9xl
     bg-slate-100 m-2 min-w-52 min-h-52 rounded-xl">{props.point}</button>
     {isHovered && (
                <div className=" h-3 flex items-center justify-center mt-4">
                    Players
                </div>
            )}
  </div>
);
}

export default ActiveTeamPanel;
