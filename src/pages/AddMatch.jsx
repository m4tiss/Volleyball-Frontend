import {React,useState,useEffect} from 'react';
import axios from '../config/axios';
import { useAuth } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';


function AddMatch() {

  const [allTeams, setAllTeams] = useState([]);
  const navigate = useNavigate();

  const {token} = useAuth

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/referee/teams`);
        const teams = res.data;
        console.log(teams)
        setAllTeams(teams);
      } catch (error) {
        navigate('/content');
        console.error('Error fetching data:', error);
      }
    };
    fetchData()
  }, [token]);


    return (
      <div className="flex w-full items-center flex-col">
       Dodawanie meczu                   
      </div>
    );
  }
  
  export default AddMatch;
  