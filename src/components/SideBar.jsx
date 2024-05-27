import React,{useState} from 'react';

function SideBar() {


  const [status, setStatus] = useState('');

    return (
      <div className="flex basis-1/4">
        <div className='flex justify-center items-center flex-col w-full bg-rose-400 h-fit rounded-bl-xl'>
        <h2 className='text-3xl mb-5'>Filtracja</h2>
          <label className="text-xl">
            <input
            className='mx-2'
              type="radio"
              name="status"
              value="PLANNED"
              checked={status === 'PLANNED'}
              onChange={(e) => setStatus(e.target.value)}
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
              onChange={(e) => setStatus(e.target.value)}
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
              onChange={(e) => setStatus(e.target.value)}
            />
            FINISHED
          </label>
        </div>
        
      </div>
    );
  }
  
  export default SideBar;
  