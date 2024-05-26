import React from 'react';
import Content from "./components/Content";
import NavBar from "./components/Navbar";

function App() {
  return (
    <div className="flex flex-col">
    <NavBar/>
    <Content/>
    </div>
  );
}

export default App;
