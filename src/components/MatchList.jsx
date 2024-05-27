import React from "react";
import MatchPanel from "./MatchPanel";
import { useMatches } from "../providers/MatchProvider";

function MatchList() {
  const { allMatches } = useMatches();

  return (
    <div className="flex flex-col basis-3/4 items-center gap-10">
      <h2 className="text-3xl pt-8">Harmonogram spotkań</h2>
      {allMatches.map((matches) => (
        <MatchPanel key={matches.id} />
      ))}
    </div>
  );
}

export default MatchList;
