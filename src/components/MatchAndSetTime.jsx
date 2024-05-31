import React, { useState, useEffect, useRef } from "react";

function MatchAndSetTime({ status, times }) {
  const [matchTime, setMatchTime] = useState(0);
  const [setTime, setSetTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());


  const intervalIdRef = useRef(null);

  useEffect(() => {
    const matchStartTime = new Date(times[0].start_time)
    const setStartTime = new Date(times[times.length-1].start_time)
    console.log("match"+matchStartTime)
    console.log("set"+setStartTime)

    const updateTimes = () => {
      const currentTime = new Date().getTime();
      const elapsedMatchTime = Math.floor((currentTime - matchStartTime) / 1000);
      const elapsedSetTime = Math.floor((currentTime - setStartTime) / 1000);

      setMatchTime(elapsedMatchTime);
      setSetTime(elapsedSetTime);
      setCurrentTime(new Date());
    };

    updateTimes();

   intervalIdRef.current = setInterval(updateTimes, 1000);

   return () => clearInterval(intervalIdRef.current);
  }, [times]);

  useEffect(() => {
    if (status === "FINISHED") {
      clearInterval(intervalIdRef.current);
    }
  }, [status])

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div className="flex mb-10">
        <div className="text-center bg-purple-500 min-w-52 text-xl text-white p-3 rounded-3xl mx-5">
        Current time: {formatTime(currentTime.getHours() * 3600 + currentTime.getMinutes() * 60 + currentTime.getSeconds())}
      </div>
      <div className="text-center bg-purple-500 min-w-52 text-xl text-white p-3 rounded-3xl mx-5">
        Match time: {formatTime(matchTime)}
      </div>
      <div className="text-center bg-purple-500 min-w-52 text-xl text-white p-3 rounded-3xl mx-5">
        Set time: {formatTime(setTime)}
      </div>
    </div>
  );
}

export default MatchAndSetTime;
