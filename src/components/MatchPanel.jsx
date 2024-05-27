import React from "react";

function MatchPanel() {
  return (
    <div className="flex w-[600px] h-36 items-center justify-between bg-purple-600 rounded-mg border-b-4 border-t-4 border-yellow-400 px-5">
      <h2 className="text-white text-2xl">Asseco Ressovia</h2>
      <div className="flex flex-col justify-between items-center bg-white w-32 h-36 border-b-4 border-t-4 border-yellow-400">
        <div className="bg-blue-400 text-white p-2 w-32 flex justify-center items-center">
          15.02.2024
        </div>
        <div className="flex justify-center items-center">
          <h2 className="text-4xl">3</h2>
          <h2 className="text-4xl">:</h2>
          <h2 className="text-4xl">1</h2>
        </div>
        <div className="bg-lime-400 text-white p-2 w-32 flex justify-center items-center">
          Finished
        </div>
      </div>
      <h2 className="text-white text-2xl">Skra Bełchatów</h2>
    </div>
  );
}

export default MatchPanel;
