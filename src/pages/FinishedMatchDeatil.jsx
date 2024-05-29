import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../config/axios";

function FinishedMatchDetail() {
  let { matchId } = useParams();

  const [match, setMatch] = useState({});
  const [rows, setRows] = useState([[], []]);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const res = await axios.get(`/observator/matches/${matchId}`);
        const match = res.data;
        setMatch(match);
        setRows([[match.name_a], [match.name_b]]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchMatch();
  }, [matchId]);

  const sets = match.result_detailed?.resD || [];

  const processTimelineData = (timeline) => {
    const newRows = [[match.name_a], [match.name_b]];

    timeline.forEach((set) => {
      let prevScoreA = 0;
      let prevScoreB = 0;

      set.forEach((point) => {
        if (point === 'ta') {
          newRows[0].push("T");
          newRows[1].push("");
        } else if (point === 'tb') {
          newRows[0].push("");
          newRows[1].push("T");
        } else {
          const [scoreA, scoreB] = point.split(":").map(Number);

          if (scoreA > prevScoreA) {
            newRows[0].push(scoreA);
            newRows[1].push("");
          } else if (scoreB > prevScoreB) {
            newRows[0].push("");
            newRows[1].push(scoreB);
          }

          prevScoreA = scoreA;
          prevScoreB = scoreB;
        }
      });
    });

    return newRows;
  };

  const setRowsForSet = (index) => {
    const timelineForSet = match.timeline?.timeline[index];
    if (timelineForSet) {
      return processTimelineData([timelineForSet]);
    }
    return [[], []];
  };

  return (
    <div className="flex w-full items-center flex-col">
      <div className="flex my-8">
        <h2 className="text-4xl px-10">{match.name_a}</h2>
        <h2 className="text-4xl px-10">{match.result}</h2>
        <h2 className="text-4xl px-10">{match.name_b}</h2>
      </div>
      {sets.map((set, index) => {
        const rowsForSet = setRowsForSet(index);
        return (
          <div key={index} className="h-60 w-3/4 border-2 border-purple-700 mb-4">
            <h2 className="text-3xl m-5" >Set {index + 1}: {set}</h2>
            <div className="grid grid-cols-1 overflow-x-auto">
              {rowsForSet.map((row, rowIndex) => (
                <div key={rowIndex} className="flex w-10">
                  <div className="p-2 min-w-20 text-center font-bold">
                    {row[0]}
                  </div>
                  {row.slice(1).map((item, colIndex) => (
                    <div key={colIndex} className="flex justify-center items-center min-w-10 border border-gray-300 text-center">
                      {item || "\u00A0"}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FinishedMatchDetail;
