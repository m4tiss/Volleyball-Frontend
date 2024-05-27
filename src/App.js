import React from 'react';
import Content from "./components/Content";
import NavBar from "./components/Navbar";

function App() {
  return (
    <div className="flex flex-col h-screen">
    <NavBar/>
    <Content/>
    </div>
  );
}

export default App;
