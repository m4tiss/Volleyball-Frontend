import {React,useState} from 'react';
import axios from '../config/axios';

function AllTeams() {



    return (
      <div className="flex w-full justify-center">
            <h2 className="text-3xl pt-8">Team list</h2>
                {/* {allMatches.map((match) => ( */}
                    {/* <TeamPanel key={match.id} match={match} /> */}
                {/* ))} */}
      </div>
    );
  }
  
  export default AllTeams;
  