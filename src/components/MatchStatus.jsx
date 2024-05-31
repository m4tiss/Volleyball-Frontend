import { React } from "react";
function MatchStatus({status}) {

      return (
        <div
        className={`${
          status === "IN_PROGRESS"
            ? "bg-orange-400 text-white"
            : status === "FINISHED"
            ? "bg-lime-400 text-black"
            : status === "PLANNED"
            ? "bg-pink-500 text-white"
            : "bg-lime-400 text-black"
        }  p-3 mb-10 rounded-3xl text-xl shadow-xl`}
      >
        {status}
      </div>
        )
  }
  
  export default MatchStatus;
  
