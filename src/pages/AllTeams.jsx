import {React,useState,useEffect} from 'react';
import { Navigate } from "react-router-dom";
import axios from '../config/axios';
import { useAuth } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import TeamPanel from '../components/TeamPanel';
import TeamPage from './TeamPage';

function AllTeams() {

  const [allTeams, setAllTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [counter, setCounter] = useState(0);
  const navigate = useNavigate();

  const {token} = useAuth

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/referee/teams`);
        const teams = res.data;
        setAllTeams(teams);
      } catch (error) {
        navigate('/content');
        console.error('Error fetching data:', error);
      }
    };
    fetchData()
  }, [token, navigate,counter]);

  const handleTeamClick = (team) => {
    setSelectedTeam(team); 
  };

    return (
      <div className="flex w-full items-center flex-col">
            <h2 className="text-3xl pt-8">Team list</h2>
            <div className='flex w-full'>
              <div className="w-1/2 flex flex-col items-center">
                {allTeams.map((team) => ( 
                    <TeamPanel onClick={() => handleTeamClick(team)} key={team.id} name={team.name} />
                 ))}</div>
              <div className="w-1/2">
              {selectedTeam && <TeamPage team={selectedTeam} setCounter={setCounter} />}
              </div>
            </div>
                
                  
      </div>
    );
  }
  
  export default AllTeams;
  