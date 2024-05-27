import React from 'react';
import { useMatches } from "../providers/MatchProvider";
function SideBar() {


  const {status,setStatus } = useMatches();

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

    return (
      <div className="flex basis-1/4">
        <div className='flex justify-center items-center flex-col w-full bg-rose-400 h-fit rounded-bl-xl'>
        <h2 className='text-3xl mb-5'>Filtration</h2>
        <label className="text-xl">
            <input
            className='mx-2'
              type="radio"
              name="status"
              value="ALL"
              checked={status === 'ALL'}
              onChange={handleChange}
            />
            ALL
          </label>
          <label className="text-xl">
            <input
            className='mx-2'
              type="radio"
              name="status"
              value="PLANNED"
              checked={status === 'PLANNED'}
              onChange={handleChange}
            />
            PLANNED
          </label>
          <label className="text-xl">
          
            <input
              className='mx-2'
              type="radio"
              name="status"
              value="IN_PROGRESS"
              checked={status === 'IN_PROGRESS'}
              onChange={handleChange}
            />
            IN_PROGRESS
          </label>
          <label className="text-xl">
            <input
            className='mx-2'
              type="radio"
              name="status"
              value="FINISHED"
              checked={status === 'FINISHED'}
              onChange={handleChange}
            />
            FINISHED
          </label>
        </div>
        
      </div>
    );
  }
  
  export default SideBar;
  