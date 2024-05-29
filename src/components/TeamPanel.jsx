import React from "react";

function TeamPanel(props) {
  return (
    <div onClick={props.onClick} className="w-60 text-3xl flex justify-center items-center p-5 rounded-xl shadow-xl
     hover:scale-110 hover:duration-200 bg-yellow-300 m-5
     cursor-pointer">
      {props.name}
    </div>
  );
}

export default TeamPanel;
