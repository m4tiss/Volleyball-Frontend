import React from "react";
import MatchPanel from "./MatchPanel";
import { useMatches } from "../providers/MatchProvider";

function MatchList() {
  const { allMatches } = useMatches();

  return (
    <div className="flex flex-col basis-3/4 items-center gap-10">
      <h2 className="text-3xl pt-8">Match list</h2>
      {allMatches.map((match) => (
        <MatchPanel key={match.id} match={match} />
      ))}
    </div>
  );
}

export default MatchList;
