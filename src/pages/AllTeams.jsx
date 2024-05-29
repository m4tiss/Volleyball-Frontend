import {React,useState,useEffect} from 'react';
import { Navigate } from "react-router-dom";
import axios from '../config/axios';
import { useAuth } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import TeamPanel from '../components/TeamPanel';

function AllTeams() {

  const [allTeams, setAllTeams] = useState([]);
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
  }, [token,navigate]);


    return (
      <div className="flex w-full items-center flex-col">
            <h2 className="text-3xl pt-8">Team list</h2>
                {allTeams.map((team) => ( 
                    <TeamPanel key={team.id} team={team} />
                 ))}
      </div>
    );
  }
  
  export default AllTeams;
  