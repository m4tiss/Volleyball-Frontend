import { React, useState, useEffect } from "react";
import Switch from "react-switch";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import axios from "../config/axios";

function Settings() {
  const [isTieBreak, setIsTieBreak] = useState(false);
  const [pointsToWinSet, setPointsToWinSet] = useState();
  const [pointsToWinTieBreak, setPointsToWinTieBreak] = useState();
  const [setsToWin, setSetsToWin] = useState();
  const navigate = useNavigate();

  const { token } = useAuth();

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await axios.get(`/referee/configuration`);
        setIsTieBreak(res.data.is_tie_break);
        setPointsToWinSet(res.data.points_to_win_set);
        setPointsToWinTieBreak(res.data.points_to_win_tie_break);
        setSetsToWin(res.data.sets_to_win);
      } catch (error) {
        navigate("/content");
        console.error("Error fetching data:", error);
      }
    };
    fetchConfig();
  }, [token]);

  const onSaveConfig = async () => {
    const updatedConfig = {
      is_tie_break: isTieBreak,
      points_to_win_set: pointsToWinSet,
      points_to_win_tie_break: pointsToWinTieBreak,
      sets_to_win: setsToWin,
    };

    try {
      const res = await axios.post(`/referee/configuration`, updatedConfig);
      console.log("Config updated:", res.data);
      setIsTieBreak(res.data.is_tie_break);
      setPointsToWinSet(res.data.points_to_win_set);
      setPointsToWinTieBreak(res.data.points_to_win_tie_break);
      setSetsToWin(res.data.sets_to_win);
      toast.success("New configuartion saved!");
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("New configuartion not saved!");
    }
  };

  return (
    <div className="flex w-full items-center flex-col">
      <div className="text-5xl my-6">Settings</div>
      <div className="flex items-center flex-col w-1/4 ">
        <div className="w-full">
          <label className="text-lg font-semibold">Sets to win:</label>
          <input
            type="text"
            value={setsToWin}
            onChange={(e) => setSetsToWin(e.target.value)}
            className="border border-gray-300 p-2 mt-2 w-full"
          />
        </div>

        <div className="w-full">
          <label className="text-lg font-semibold">Points to win set:</label>
          <input
            type="text"
            value={pointsToWinSet}
            onChange={(e) => setPointsToWinSet(e.target.value)}
            className="border border-gray-300 p-2 mt-2 w-full"
          />
        </div>

        <div className="w-full flex flex-col">
          <label className="text-lg font-semibold">Tie break:</label>
          <Switch
            onChange={(checked) => setIsTieBreak(checked)}
            checked={isTieBreak}
          />
        </div>

        <div className="w-full">
          <label className="text-lg font-semibold">
            Points to win tie break:
          </label>
          <input
            type="text"
            value={pointsToWinTieBreak}
            onChange={(e) => setPointsToWinTieBreak(e.target.value)}
            className="border border-gray-300 p-2 mt-2 w-full"
          />
        </div>
      </div>
      <button
        onClick={onSaveConfig}
        className="bg-purple-500 my-6 px-5 py-3 rounded-xl text-white hover:scale-110 duration-200"
      >
        Save configuration
      </button>
      <ToastContainer />
    </div>
  );
}

export default Settings;
