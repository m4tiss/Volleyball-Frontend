import React from "react";

function TeamPanel({team}) {
  return (
    <div className="w-60 text-3xl flex justify-center items-center p-5 rounded-xl shadow-xl
     hover:scale-110 hover:duration-200 bg-yellow-300 m-5
     cursor-pointer">
      {team.name}
    </div>
  );
}

export default TeamPanel;
