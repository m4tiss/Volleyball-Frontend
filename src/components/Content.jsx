import { React, useState, useEffect } from "react";
import MatchList from './MatchList';
import SideBar from './SideBar';
import axios from "../config/axios";

function Content() {

  const [allmatches, setAllmatches] = useState([]);

  useEffect(() => {
    axios.get("/observator/matches/all").then((res) => {
      const allmatches = res.data;
      console.log(allmatches)
      setAllmatches(allmatches);
    });
  }, []);

    return (
      <div className="flex flex-auto">
        <MatchList/>
        <SideBar/>
      </div>
    );
  }
  
  export default Content;
  