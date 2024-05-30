import { React, useState,useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import EditTeam from "../components/EditTeam";
import axios from '../config/axios'

function TeamPage({ team, setCounter, closeTeamClick }) {

  const [edit, setEdit] = useState(false);


  const handleEdit = () => {
    setEdit(!edit); 
  };

   const [players, setPlayers] = useState(team.players.players);

   useEffect(() => {
    setPlayers(team.players.players);
  }, [team]);

  const updatePlayers = (newPlayers) => {
    setPlayers(newPlayers);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/referee/teams/${team.id}`);
    } catch (error) {
      console.error('Error posting data:', error);
    }
    setCounter(prev=> prev + 1)
    closeTeamClick()
  };

  return (
    <div className="flex w-full items-center flex-col text-black">
      <h2 className="text-3xl">Player list</h2>
      {players.map((player, index) => (
        <h2 className="text-2xl my-3" key={index}>
          {player}
        </h2>
      ))}
      <div className="flex my-10">
        <CiEdit 
        className="mx-10 cursor-pointer" 
        size={60} 
        color="green"
        onClick={()=>handleEdit()} />
        <RiDeleteBin6Line 
        className="mx-10 cursor-pointer" 
        size={55} 
        color="red"
        onClick={()=>handleDelete()}
        />
      </div>
      <div>
        {edit && <EditTeam team={team} setCounter={setCounter} updatePlayers={updatePlayers}/>}
      </div>
    </div>
  );
}

export default TeamPage;
