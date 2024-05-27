import { React, useState, useEffect } from "react";
import MatchList from './MatchList';
import SideBar from './SideBar';
import axios from "../config/axios";

function Content() {

    return (
      <div className="flex flex-auto">
        <MatchList/>
        <SideBar/>
      </div>
    );
  }
  
  export default Content;
  
