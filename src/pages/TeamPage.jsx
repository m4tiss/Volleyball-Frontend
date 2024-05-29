import {React} from 'react';


function TeamPage({team}) {

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
  