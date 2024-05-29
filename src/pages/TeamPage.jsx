import { React, useState,useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import EditTeam from "../components/EditTeam";

function TeamPage({ team, setCounter }) {

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
        <RiDeleteBin6Line className="mx-10" size={55} color="red"/>
      </div>
      <div>
        {edit && <EditTeam team={team} setCounter={setCounter} updatePlayers={updatePlayers}/>}
      </div>
    </div>
  );
}

export default TeamPage;
