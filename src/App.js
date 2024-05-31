import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Content from "./components/Content";
import NavBar from "./components/Navbar";
import AllTeams from "./pages/AllTeams";
import { MatchProvider } from "./providers/MatchProvider";
import Login from "./pages/auth/Login";
import { AuthProvider, useAuth } from "./providers/AuthProvider";
import MatchDetail from "./pages/MatchDetail";
import TeamPage from "./pages/TeamPage";
import AddMatch from "./pages/AddMatch";
import Settings from "./pages/Settings";
import FinishedMatchDetail from "./pages/FinishedMatchDeatil";

function App() {  
  return (
    <AuthProvider>
      <MatchProvider>
        <BrowserRouter>
          <div className="flex flex-col h-screen">
            <NavBar />
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route
                path="login"
                element={<AuthRoute component={<Login />} />}
              />
              <Route
                path="content"
                element={<PrivateRoute component={<Content />} />}
              />
              <Route
                path="allTeams"
                element={<PrivateRoute component={<AllTeams />} />}
              />
              <Route
                path="addMatch"
                element={<PrivateRoute component={<AddMatch />} />}
              />
              <Route
                path="settings"
                element={<PrivateRoute component={<Settings />} />}
              />
              <Route path="matchDetail/:matchId"
               element={<PrivateRoute component={<MatchDetail />} />}
               />

              <Route path="matchDetail/live/:matchId"
               element={<PrivateRoute component={<FinishedMatchDetail />} />}
               />

            </Routes>
          </div>
        </BrowserRouter>
      </MatchProvider>
    </AuthProvider>
  );
}

function PrivateRoute({ component }) {
  const { isAuth } = useAuth();

  return isAuth() ? component : <Navigate to="/login" />;
}

function AuthRoute({ component }) {
  const { isAuth } = useAuth();

  return isAuth() ? <Navigate to="/content" /> : component;
}

export default App;
