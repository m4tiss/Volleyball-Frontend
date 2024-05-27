import React from 'react';
import MatchList from './MatchList';
import SideBar from './SideBar';

function Content() {
    return (
      <div className="flex flex-auto">
        <MatchList/>
        <SideBar/>
      </div>
    );
  }
  
  export default Content;
  