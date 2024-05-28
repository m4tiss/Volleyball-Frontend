import {React,useState} from 'react';
import { useParams } from "react-router-dom";
import axios from '../config/axios';


function MacthDetail() {

    let { matchId } = useParams();

    return (
      <div className="flex w-full justify-center">
            <h2 className="text-3xl pt-8">Match detail + {matchId}</h2>
      </div>
    );
  }
  
  export default MacthDetail;
  