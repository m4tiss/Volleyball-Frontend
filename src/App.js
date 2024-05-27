import React from "react";
import Content from "./components/Content";
import NavBar from "./components/Navbar";
import {MatchProvider} from "./providers/MatchProvider";

function App() {
  return (
    <MatchProvider>
      <div className="flex flex-col h-screen">
        <NavBar />
        <Content />
      </div>
    </MatchProvider>
  );
}

export default App;
