import React from 'react';
import MatchPanel from './MatchPanel';

function MatchList() {
    return (
      <div className="flex flex-col basis-3/4 items-center gap-10">
            <h2 className='text-3xl pt-8'>Harmonogram spotkań</h2>
            <MatchPanel/>
            <MatchPanel/>
            <MatchPanel/>
      </div>
    );
  }
  
  export default MatchList;
  