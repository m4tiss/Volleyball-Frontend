import { React, useState, useEffect } from "react";
import { useAuth } from "../providers/AuthProvider";
import axios from "../config/axios";

function DowngraderAndTimeouts(props) {


    const [isReferee, setIsReferee] = useState(false);
    const { token } = useAuth();
    const [timeouts, setTimeouts] = useState(props.timeouts);
  
  
  
    useEffect(() => {
      const fetchUserRole = async () => {
        console.log(timeouts)
        try {
          const res = await axios.get(`/auth/user`);
          const user_data = res.data;
          if(user_data.role === "referee")setIsReferee(true);
        } catch (error) {
          setIsReferee(false);
          console.error('Error fetching data:', error);
        }
      };
      fetchUserRole()
    }, [token]);

    const onTimeout = () => {
        if (timeouts > 0) {
          setTimeouts(timeouts - 1);
          console.log(timeouts - 1); 
        }
      };

    return (
        <div className="flex justify-evenly">
        <button disabled={!isReferee} className={`text-3xl bg-slate-100 p-2 rounded-lg ${!isReferee ? 'opacity-50' : ''}`}>-1</button>
        
        {timeouts === 2 && (
            <>
              <button
                key="0"
                disabled={!isReferee}
                onClick={isReferee ? onTimeout : null}
                className={`text-3xl text-white ${!isReferee ? 'opacity-50' : ''}`}
              >
                T
              </button>
              <button
              disabled={!isReferee}
                key="1"
                onClick={isReferee ? onTimeout : null}
                className={`text-3xl text-white ${!isReferee ? 'opacity-50' : ''}`}
              >
                T
              </button>
            </>
          )}
          {timeouts === 1 && (
            <>
              <button
                disabled={!isReferee}
                key="0"
                onClick={isReferee ? onTimeout : null}
                className={`text-3xl text-white ${!isReferee ? 'opacity-50' : ''}`}
              >
                T
              </button>
              <button
                key="1"
                className={`text-3xl text-black ${!isReferee ? 'opacity-50' : ''}`}
                disabled={true}
              >
                T
              </button>
            </>
          )}
          {timeouts === 0 && (
            <>
              <button
                key="0"
                className={`text-3xl text-black ${!isReferee ? 'opacity-50' : ''}`}
                disabled={true}
              >
                T
              </button>
              <button
                key="1"
                className={`text-3xl text-black ${!isReferee ? 'opacity-50' : ''}`}
                disabled={true}
              >
                T
              </button>
            </>
          )}
  
      </div>
    );
  }
  
  export default DowngraderAndTimeouts;
  
