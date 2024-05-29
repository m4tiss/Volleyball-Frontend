import { React, useState, useEffect } from "react";
import axios from "../config/axios";

function EditTeam({ team,setCounter, updatePlayers }) {

    const [teamName, setTeamName] = useState(team.name);
    const [players, setPlayers] = useState(team.players.players);
  
    const onSave = async () => {
      console.log('Team Name:', teamName);

      const playersArray = players.split(",").map(player => player.trim());
      try {
        await axios.post(`/referee/teams/${team.id}`, {
          name: teamName,
          players: playersArray
        });
        updatePlayers(playersArray)
      } catch (error) {
        console.error('Error posting data:', error);
      }
      setCounter(prev => prev + 1)

    };
  
    useEffect(() => {
        setTeamName(team.name);
        setPlayers(team.players.players);
      }, [team]);

    return (
      <div className="flex flex-col ">
        <div>
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
        <button onClick={onSave} className="bg-purple-600 text-white p-2 mt-4">
          Save
        </button>
      </div>
    );

  }
  
  export default EditTeam;
  
