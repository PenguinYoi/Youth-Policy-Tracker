import React from "react";
import "./styles.css";
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from "react-router-dom";
import BillList from "./BillList";
import BillDetails from "./BillDetails";
import Representatives from "./Representatives";
import Chatbot from "./Chatbot";
import Intro from "./Intro";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="app-header">
      <h1
        className="app-title"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/intro")}
      >
        Nevada Youth Policy Tracker
      </h1>
      <nav className="nav-tabs">
        <NavLink
          to="/bills"
          className={({ isActive }) => "tab-link" + (isActive ? " active-tab" : "")}
        >
          Bills
        </NavLink>
        <NavLink
          to="/representatives"
          className={({ isActive }) => "tab-link" + (isActive ? " active-tab" : "")}
        >
          Representatives
        </NavLink>
        <NavLink
          to="/chatbot"
          className={({ isActive }) => "tab-link" + (isActive ? " active-tab" : "")}
        >
          Chatbot
        </NavLink>
      </nav>
    </header>
  );
}

function App() {
  return (
    <Router>
      <Header />
      <main className="app-content">
        <Routes>
          <Route path="/intro" element={<Intro />} />
          <Route path="/bills" element={<BillList />} />
          <Route path="/bill/:id" element={<BillDetails />} />
          <Route path="/representatives" element={<Representatives />} />
          <Route path="/chatbot" element={<Chatbot />} />
          {/* Redirect root to /intro */}
          <Route path="/" element={<Intro />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
