import {React,useState,useEffect} from 'react';
import axios from '../config/axios';
import { useAuth } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

function TeamPage({team}) {



  const {token} = useAuth

    const players = team.players.players
    return (
      <div className="flex w-full items-center flex-col text-black">
        <h2 className='text-3xl' >Player list</h2>
        {players.map((player,index) => ( 
                    <h2 className='text-2xl my-3' key={index}>{player}</h2>
                 ))}
      </div>
    );
  }
  
  export default TeamPage;
  