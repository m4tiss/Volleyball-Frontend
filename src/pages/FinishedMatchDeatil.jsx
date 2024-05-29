import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaRegCopy } from "react-icons/fa";
import axios from "../config/axios";
import { format } from 'date-fns';


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
        console.log(match)
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

  const printSets = (formattedResult, numSets, longerNameLength) => {
    let result = formattedResult;
    result += ' '.repeat(longerNameLength + 1);
  
    for (let i = 1; i <= numSets; i++) {
      result += `S${i} | `;
    }
    result += `Total\n`;
  
    return result;
  };
  
  const printTeamA = (formattedResult, numSets, shorterName, differenceSpace, points_teama, sets_a) => {
    let result = formattedResult;
  
    if (shorterName === match.name_a) {
      result += `${match.name_a} `;
      result += ' '.repeat(differenceSpace);
    } else {
      result += `${match.name_a} `;
    }
  
    for (let i = 0; i < numSets; i++) {
      result += `${points_teama[i]} | `;
    }
    result += `${sets_a}\n`;
  
    return result;
  };
  
  const printTeamB = (formattedResult, numSets, shorterName, differenceSpace, points_teamb, sets_b) => {
    let result = formattedResult;
  
    if (shorterName === match.name_b) {
      result += `${match.name_b} `;
      result += ' '.repeat(differenceSpace);
    } else {
      result += `${match.name_b} `;
    }
  
    for (let i = 0; i < numSets; i++) {
      result += `${points_teamb[i]} | `;
    }
    result += `${sets_b}\n`;
  
    return result;
  };

  const formatMatchResult = (match) => {
    let formattedResult = "";

      const points_teama = [];
      const points_teamb = [];
      const numSets = match.result_detailed.resD.length;

      let [sets_a, sets_b] = match.result.split(":").map(num => parseInt(num));

      let longerName = match.name_a.length > match.name_b.length ? match.name_a : match.name_b;
      let shorterName = match.name_a.length > match.name_b.length ? match.name_b : match.name_a;
      let longerNameLength = longerName.length;
      let shorterNameLength = shorterName.length;
      let differenceSpace = longerNameLength - shorterNameLength
        
      match.result_detailed.resD.forEach((item) => {
        const [pointsA, pointsB] = item.split(":").map(num => parseInt(num));
        points_teama.push(pointsA);
        points_teamb.push(pointsB);
      });

      formattedResult = printSets(formattedResult, numSets, longerNameLength);
      formattedResult = printTeamA(formattedResult, numSets, shorterName, differenceSpace, points_teama, sets_a);
      formattedResult = printTeamB(formattedResult, numSets, shorterName, differenceSpace, points_teamb, sets_b);
      const formattedDate = format(new Date(match.match_date), "HH:mm:ss dd-MM-yyyy");
      formattedResult += `${formattedDate}\n`;

    return formattedResult;
  };

  const copyToClipboard = (formattedData) => {
    navigator.clipboard.writeText(formattedData)
      .then(() => {
        console.log('Copied to clipboard');
      })
      .catch((error) => {
        console.error('Error copying to clipboard:', error);
      });
  };

  const handleCopyToClipboard = () => {
    const formattedData = formatMatchResult(match);
    copyToClipboard(formattedData);
  };

  return (
    <div className="flex w-full items-center flex-col">
      <div className="flex my-8">
        <h2 className="text-4xl px-10">{match.name_a}</h2>
        <h2 className="text-4xl px-10">{match.result}</h2>
        <h2 className="text-4xl px-10">{match.name_b}</h2>
      </div>
      <div onClick={handleCopyToClipboard} className="mb-10 cursor-pointer">
      <FaRegCopy size={40}/>
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