import React from "react";
import Content from "./components/Content";
import NavBar from "./components/Navbar";
import { MatchProvider } from "./providers/MatchProvider";
import Login from "./pages/auth/Login";
import { AuthProvider } from "./providers/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <MatchProvider>
        <div className="flex flex-col h-screen">
          <NavBar />
          <Login />
          {/* <Content /> */}
        </div>
      </MatchProvider>
    </AuthProvider>
  );
}

export default App;
