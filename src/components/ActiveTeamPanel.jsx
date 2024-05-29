import { React, useState, useEffect } from "react";
import axios from "../config/axios";
import { useAuth } from "../providers/AuthProvider";

function ActiveTeamPanel(props) {

  const [isReferee, setIsReferee] = useState(false);

  const { token } = useAuth();


  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const res = await axios.get(`/auth/user`);
        const user_data = res.data;
        if(user_data.role==="referee")setIsReferee(true);
      } catch (error) {
        setIsReferee(false);
        console.error('Error fetching data:', error);
      }
    };
    fetchUserRole()
  }, [token]);

return (
  <div className="flex mx-5 bg-yellow-400 flex-col w-72 shadow-xl">
    <div className="flex justify-evenly items-center m-2">
      <h2 className="text-3xl">{props.name}</h2>
      <h2 className="text-3xl bg-slate-100 p-2 rounded-lg">{props.set}</h2>
    </div>
    <div className="flex justify-evenly">
      <button disabled={!isReferee} className={`text-3xl bg-slate-100 p-2 rounded-lg ${!isReferee ? 'opacity-50' : ''}`}>-1</button>
      <button disabled={!isReferee} className={`text-3xl text-white ${!isReferee ? 'opacity-50' : ''}`}>T</button>
      <button disabled={!isReferee} className={`text-3xl text-white ${!isReferee ? 'opacity-50' : ''}`}>T</button>
    </div>
    <div className="flex justify-center items-center text-9xl bg-slate-100 m-2 min-w-52 min-h-52 rounded-xl">{props.point}</div>
  </div>
);
}

export default ActiveTeamPanel;
