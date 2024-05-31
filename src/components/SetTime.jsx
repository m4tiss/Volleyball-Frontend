import React, { useState, useEffect} from "react";

function SetTime({index, times }) {
  const [setTime, setSetTime] = useState(0);

  useEffect(() => {
    const setStartTime = new Date(times[index].start_time);
    const updateTimes = () => {
      const currentTime = new Date().getTime();
      const elapsedSetTime = Math.floor((currentTime - setStartTime) / 1000);
      setSetTime(elapsedSetTime);
    };

    updateTimes();
  }, [times]);

  useEffect(() => {
    const setStartTime = new Date(times[index].start_time);
    let setEndTime = new Date(times[index].end_time);
    if (setEndTime.getTime() === new Date('Thu Jan 01 1970 01:00:00 GMT+0100').getTime()) {
        setEndTime = null;
    }

    console.log("END TIME" + setEndTime + "index" + index)
    const updateTimes = () => {
        if(setEndTime !=  null){
            const elapsedSetTime = Math.floor((setEndTime - setStartTime) / 1000);
            setSetTime(elapsedSetTime);
        }else{
            const currentTime = new Date().getTime();
            const elapsedSetTime = Math.floor((currentTime - setStartTime) / 1000);
            setSetTime(elapsedSetTime);
        }
    };

    updateTimes();
  }, [times]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const mins = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div className="text-center text-3xl text-black p-3 rounded-3xl mx-5">
      Set time: {formatTime(setTime)}
    </div>
  );
}

export default SetTime;
