import { React, useState, useEffect } from "react";
import axios from "../config/axios";

function AddTeam({setCounter,handleAddTeam}) {

    const [teamName, setTeamName] = useState('');
    const [players, setPlayers] = useState('');
  
     const onSave = async () => {
       const playersArray = players.split(",").map(player => player.trim());
      try {
        await axios.post(`/referee/teams`, {
          name: teamName,
          players: playersArray
        });
      } catch (error) {
        console.error('Error posting data:', error);
      }
      setCounter(prev => prev + 1)
      handleAddTeam()

     };
  
    return (
      <div className="flex flex-col items-center">
        <div className="w-1/2">
        <div >
          <label className="text-lg font-semibold">Team Name:</label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="border border-gray-300 p-2 mt-2 w-full"
          />
        </div>
        <div>
          <label className="text-lg font-semibold">Players:</label>
            <input
              type="text"
              value={players}
              onChange={(e) =>setPlayers(e.target.value)}
              className="border border-gray-300 p-2 mt-2 w-full"
            />
        </div>
        <button onClick={onSave} className="bg-purple-600 text-white p-2 mt-4 w-full">
          Save
        </button>
        </div>
      </div>
    );

  }
  
  export default AddTeam;
  
