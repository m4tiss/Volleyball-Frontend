import { React } from "react";
import axios from "../config/axios";
function EndMatchButton({matchId}) {
    const onEndButton = async () => {
        try {
          await axios.post(`/referee/live/endmatch`, {
            match_id: matchId,
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      return (
          <button
            onClick={onEndButton}
            className="my-10 bg-purple-500 px-5 py-3 rounded-xl text-white hover:scale-110 duration-200"
          >
            End Match
          </button>
        )
  }
  
  export default EndMatchButton;
  
