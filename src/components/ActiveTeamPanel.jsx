import { React, useState, useEffect } from "react";

function ActiveTeamPanel(props) {
  return (
    <div className="flex mx-5 bg-yellow-400 flex-col w-72 shadow-xl">
      <div className="flex justify-evenly items-center m-2">
        <h2 className="text-3xl">{props.name}</h2>
        <h2 className="text-3xl bg-slate-100 p-2 rounded-lg">{props.set}</h2>
      </div>
      <div className="flex justify-evenly">
        <button disabled={true} className="text-3xl bg-slate-100 p-2 rounded-lg">-1</button>
        <button disabled={true} className="text-3xl text-white">T</button>
        <button disabled={true} className="text-3xl text-white">T</button>
      </div>
      <div className="flex justify-center items-center text-9xl bg-slate-100 m-2 min-w-52 min-h-52 rounded-xl">{props.point}</div>
    </div>
  );
}

export default ActiveTeamPanel;
