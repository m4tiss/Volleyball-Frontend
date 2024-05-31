import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../config/axios";
import { createWebSocket } from "../WebSocket";
import { useAuth } from "../providers/AuthProvider";
import ActiveTeamPanel from "../components/ActiveTeamPanel";
import { RiDeleteBin6Line } from "react-icons/ri";
import EndSetButton from "../components/EndSetButton";
import EndMatchButton from "../components/EndMatchButton";

function ActiveMatchDetail() {
  const { token } = useAuth();
  let { matchId } = useParams();
  const [match, setMatch] = useState();
  const [isReferee, setIsReferee] = useState(false);
  const [isSwapped, setIsSwapped] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const res = await axios.get(`/auth/user`);
        const user_data = res.data;
        if (user_data.role === "referee") setIsReferee(true);
        console.log(isReferee);
      } catch (error) {
        setIsReferee(false);
        console.error("Error fetching data:", error);
      }
    };
    fetchUserRole();
  }, [token]);

  //not testing
  const onDeleteMatch = async () => {
    try {
      await axios.delete(`/referee/matches/${matchId}`);
      navigate("/content");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSwap = () => {
    setIsSwapped(!isSwapped);
  };

  useEffect(() => {
    console.log("active");
    const socket = createWebSocket(
      `ws://localhost:3000/live?token=${token}`,
      matchId,
      (message) => {
        let updatedMessage = { ...message };

        if (updatedMessage.result_detailed.resD.length === 0) {
          updatedMessage.result_detailed.resD = ["0:0"];
        }

        if (updatedMessage.result_detailed.timeout.length === 0) {
          updatedMessage.result_detailed.timeout = ["0:0"];
        }

        console.log(updatedMessage);
        setMatch(updatedMessage);
      }
    );

    return () => {
      socket.close();
    };
  }, [token]);

  const extractNumbers = (result) => {
    const numbers = result.split(":").map((num) => parseInt(num));
    return numbers;
  };

  const extractPoints = (set) => {
    const points = set.split(":").map((num) => parseInt(num));
    return points;
  };

  const extractTimeouts = (set_details) => {
    const timeouts = set_details.split(":").map((num) => parseInt(num));
    return timeouts;
  };

  return (
    <div className="flex flex-col w-full items-center my-20">
      {isReferee && (
        <div
          className="absolute top-1/5 left-0 h-12 flex items-center
             justify-between bg-red-500 p-2 text-xl
             text-white rounded-tr-full rounded-br-full"
        >
          Delete match
          <RiDeleteBin6Line
            onClick={onDeleteMatch}
            color="white"
            className="mx-5 hover:scale-110 duration-200 cursor-pointer"
            size={30}
          />
        </div>
      )}

      <div className="flex">
        {match &&
          (isSwapped ? (
            <>
              <ActiveTeamPanel
                side={"LEFT"}
                name={match.name_a}
                set={extractNumbers(match.result)[0]}
                point={
                  extractPoints(
                    match.result_detailed.resD[
                      match.result_detailed.resD.length - 1
                    ]
                  )[0]
                }
                teamId={match.teama_id}
                timeouts={
                  extractTimeouts(
                    match.result_detailed.timeout[
                      match.result_detailed.timeout.length - 1
                    ]
                  )[0]
                }
              />
              <button
                className="bg-slate-300 h-fit text-white text-4xl pb-2 rounded-xl shadow-lg"
                onClick={handleSwap}
              >
                &#60;=&#62;
              </button>
              <ActiveTeamPanel
                side={"RIGHT"}
                name={match.name_b}
                set={extractNumbers(match.result)[1]}
                point={
                  extractPoints(
                    match.result_detailed.resD[
                      match.result_detailed.resD.length - 1
                    ]
                  )[1]
                }
                teamId={match.teamb_id}
                timeouts={
                  extractTimeouts(
                    match.result_detailed.timeout[
                      match.result_detailed.timeout.length - 1
                    ]
                  )[1]
                }
              />
            </>
          ) : (
            <>
              <ActiveTeamPanel
                side={"LEFT"}
                name={match.name_b}
                set={extractNumbers(match.result)[1]}
                point={
                  extractPoints(
                    match.result_detailed.resD[
                      match.result_detailed.resD.length - 1
                    ]
                  )[1]
                }
                teamId={match.teamb_id}
                timeouts={
                  extractTimeouts(
                    match.result_detailed.timeout[
                      match.result_detailed.timeout.length - 1
                    ]
                  )[1]
                }
              />
              <button
                className="bg-slate-300 h-fit text-white text-4xl pb-2 rounded-xl shadow-lg"
                onClick={handleSwap}
              >
                &#60;=&#62;
              </button>
              <ActiveTeamPanel
                side={"RIGHT"}
                name={match.name_a}
                set={extractNumbers(match.result)[0]}
                point={
                  extractPoints(
                    match.result_detailed.resD[
                      match.result_detailed.resD.length - 1
                    ]
                  )[0]
                }
                teamId={match.teama_id}
                timeouts={
                  extractTimeouts(
                    match.result_detailed.timeout[
                      match.result_detailed.timeout.length - 1
                    ]
                  )[0]
                }
              />
            </>
          ))}
      </div>
      {isReferee && match && match.setEnded && (<EndSetButton matchId={matchId}/>)}
      {isReferee && match && match.matchEnded && (<EndMatchButton matchId={matchId}/>)}
    </div>
  );
}

export default ActiveMatchDetail;
