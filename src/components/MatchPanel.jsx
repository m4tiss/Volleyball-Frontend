import React from "react";
import { format } from "date-fns";

function MatchPanel({ match }) {
  const formattedDate = format(new Date(match.match_date), "HH:mm dd-MM-yyyy");

  return (
    <div className="flex w-[600px] h-36 items-center justify-between bg-purple-600 rounded-mg border-b-4 border-t-4 border-yellow-400 px-5">
      <h2 className="text-white text-2xl">{match.name_a}</h2>
      <div className="flex flex-col justify-between bg-white w-36 h-36 border-b-4 border-t-4 border-yellow-400">
        <div className="bg-blue-400 text-white p-2 flex justify-center items-center">
          {formattedDate}
        </div>
        <div className="flex justify-center items-center">
          <h2 className="text-4xl">{match.result}</h2>
        </div>
        <div
          className={`${
            match.status === "IN_PROGRESS"
              ? "bg-orange-400 text-white"
              : match.status === "FINISHED"
              ? "bg-lime-400 text-black"
              : match.status === "PLANNED"
              ? "bg-pink-500 text-white"
              : "bg-lime-400 text-black"
          }  p-2 flex justify-center items-center`}
        >
          {match.status}
        </div>
      </div>
      <h2 className="text-white text-2xl">{match.name_b}</h2>
    </div>
  );
}

export default MatchPanel;
