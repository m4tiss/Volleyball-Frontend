import {React,useState,useEffect} from 'react';
import { Navigate } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import axios from '../config/axios';
import { useAuth } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import TeamPanel from '../components/TeamPanel';
import TeamPage from './TeamPage';
import AddTeam from '../components/AddTeam';

function AllTeams() {

  const [allTeams, setAllTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [addTeam, setAddTeam] = useState(false);
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


  const handleAddTeam = () => {
    setAddTeam(!addTeam)
    setSelectedTeam(null); 
  };

  const closeTeamClick = () => {
    setSelectedTeam(null); 
  }

  const handleTeamClick = (team) => {
    setAddTeam(false)
    setSelectedTeam(team); 
  };

    return (
      <div className="flex w-full items-center flex-col">
            <h2 className="text-3xl pt-8">Team list</h2>
            <div className='flex w-full'>
              <div className="w-1/2 flex flex-col items-center">
              <IoIosAddCircleOutline
              onClick={()=>handleAddTeam()} 
              size={50}
              color='green'
              className='cursor-pointer'
              />
                {allTeams.map((team) => ( 
                    <TeamPanel onClick={() => handleTeamClick(team)} key={team.id} name={team.name} />
                 ))}</div>
              <div className="w-1/2">
              {selectedTeam && <TeamPage team={selectedTeam} setCounter={setCounter} closeTeamClick={closeTeamClick}/>}
              {addTeam && <AddTeam setCounter={setCounter} handleAddTeam={handleAddTeam} />}
              </div>
            </div>
                
                  
      </div>
    );
  }
  
  export default AllTeams;
  