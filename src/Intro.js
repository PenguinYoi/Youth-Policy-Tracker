import React from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";

function Intro() {
  const navigate = useNavigate();

  return (
    <div className="intro-container">
      <div className="intro-card">
        <h1>Welcome to the Nevada Youth Policy Tracker!</h1>
        <p className="intro-text">
          Curious about how laws are made in Nevada? You've come to the right place!
        </p>

        <section className="intro-section">
          <h2>How Legislation Works</h2>
          <ul>
            <li>
              <strong>Idea & Draft:</strong> A bill starts as an idea from a legislator, a citizen, or an organization.
            </li>
            <li>
              <strong>Introduction:</strong> The bill is introduced in either the Assembly or Senate.
            </li>
            <li>
              <strong>Committee Review:</strong> Committees examine the bill, hold hearings, and may suggest changes.
            </li>
            <li>
              <strong>Voting:</strong> The full chamber votes. If it passes, it moves to the other chamber.
            </li>
            <li>
              <strong>Governor Approval:</strong> The governor signs the bill into law—or can veto it.
            </li>
          </ul>
          <p className="fun-fact">
            Fun fact: Some bills start from the ideas YOU share online! Youth voices are powerful.
          </p>
        </section>

        <section className="intro-section">
          <h2>Explore the App</h2>
          <p>
            - <strong>Bills:</strong> See what’s being proposed and track how it progresses.<br />
            - <strong>Representatives:</strong> Find who represents you, their town halls, and contact info.<br />
            - <strong>Chatbot:</strong> Ask questions about legislation or Nevada politics in real-time.
          </p>
        </section>

        <section className="intro-section">
          <h2>Pro Tip</h2>
          <p>
            Don’t just read—interact! Vote on polls, explore bills, and reach out to representatives. 
            Understanding politics now gives you a voice tomorrow.
          </p>
        </section>

        <button className="start-btn" onClick={() => navigate("/bills")}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Intro;
