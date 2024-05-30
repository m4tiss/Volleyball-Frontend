import {React,useState,useEffect} from 'react';
import axios from '../config/axios';
import { useAuth } from '../providers/AuthProvider';
import { useMatches } from '../providers/MatchProvider';
import { useNavigate } from 'react-router-dom';
import TeamPanel from '../components/TeamPanel';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddMatch() {

  const [allTeams, setAllTeams] = useState([]);
  const [team1,setTeam1]=useState({});
  const [team2,setTeam2]=useState({});
  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate();

  const {token} = useAuth()
  const {setStatus} = useMatches()

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

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    return time.getTime() > currentDate.getTime();
  };

  // date, teama_id, teamb_id
  const onAddMatch = async () => {

    console.log(
    "JEDEN"
    )
    if(!team1.id || !team2.id){
        console.log("DWA")
        toast.error("Choose teams!")
        return;
    }

    if(team1.id === team2.id){
        toast.error("Choose different teams!")
        return;
    }

    try {
        const res = await axios.post(`/referee/matches`,{
            date:startDate,
            teama_id: team1.id,
            teamb_id: team2.id

        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setTeam1({})
      setTeam2({})
      setStatus('ALL')
      toast.success("You added match!")
  }


    return (
      <div className="flex flex-col items-center w-full">
        <div className='flex w-full'>
            <div className='w-1/3 flex flex-col items-center'>
                <h2 className="text-4xl my-10">Team 1</h2>
                <TeamPanel onClick={null} name={team1.name} />
                <h2 className="text-4xl my-10">Team List</h2>
                 {allTeams.map((team) => ( 
                    <TeamPanel onClick={() => setTeam1(team)} key={team.id} name={team.name} />
                 ))} 
            </div>
            <div className='w-1/3 flex flex-col items-center'>
                <h2 className="text-4xl my-10">Team 2</h2>
                <TeamPanel onClick={null} name={team2.name} />
                <h2 className="text-4xl my-10">Team List</h2>
                 {allTeams.map((team) => ( 
                    <TeamPanel onClick={() => setTeam2(team)} key={team.id} name={team.name} />
                 ))} 
            </div>
            <div className='w-1/3 flex flex-col items-center '>
                <h2 className="text-4xl my-10 ">Details</h2>
                <h2 className="text-xl mt-5">Select date</h2>
                <DatePicker 
                className='border-2 border-purple-600 p-2 text-center rounded-xl outline-none hover:bg-purple-500 hover:text-white cursor-pointer'
                selected={startDate} onChange={(date) => setStartDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={5}
                dateFormat="MMMM d, yyyy HH:mm"
                filterDate={filterPassedTime}
                filterTime={filterPassedTime}
                />
                <button 
                onClick={onAddMatch}
                className='bg-purple-500 my-6 px-5 py-3 rounded-xl text-white hover:scale-110 duration-200' >
                        ADD MATCH
                </button>
                <ToastContainer/>
            </div>
        </div>
      </div>
    );
  }
  
  export default AddMatch;
  