import React, { useState } from "react";
import "./representatives.css";

const federalReps = [
  {
    name: "Catherine Cortez Masto",
    chamber: "U.S. Senate",
    party: "D",
    since: "2017",
    district: "Nevada",
    website: "https://www.cortezmasto.senate.gov/",
    townHall: "https://www.cortezmasto.senate.gov/contact/town-hall",
    twitter: "https://twitter.com/SenCortezMasto",
    facebook: "https://www.facebook.com/SenCortezMasto/",
    email: "Contact through website form",
    votingRecord: { education: 75, environment: 80, healthcare: 85 }
  },
  {
    name: "Jacky Rosen",
    chamber: "U.S. Senate",
    party: "D",
    since: "2019",
    district: "Nevada",
    website: "https://www.rosen.senate.gov/",
    townHall: "https://www.rosen.senate.gov/events",
    twitter: "https://twitter.com/SenJackyRosen",
    facebook: "https://www.facebook.com/SenJackyRosen/",
    email: "Contact through website form",
    votingRecord: { education: 72, environment: 78, healthcare: 82 }
  },
  {
    name: "Dina Titus",
    chamber: "U.S. House - District 1",
    party: "D",
    since: "2013",
    district: "District 1",
    website: "https://titus.house.gov/",
    townHall: "https://titus.house.gov/contact",
    twitter: "https://twitter.com/RepDinaTitus",
    facebook: "https://www.facebook.com/RepDinaTitus/",
    email: "Contact through website form",
    votingRecord: { education: 88, environment: 90, healthcare: 85 }
  },
  {
    name: "Mark Amodei",
    chamber: "U.S. House - District 2",
    party: "R",
    since: "2011",
    district: "District 2",
    website: "https://amodei.house.gov/",
    townHall: "https://amodei.house.gov/contact",
    twitter: "https://twitter.com/RepMarkAmodei",
    facebook: "https://www.facebook.com/RepMarkAmodei/",
    email: "Contact through website form",
    votingRecord: { education: 55, environment: 40, healthcare: 50 }
  },
  {
    name: "Susie Lee",
    chamber: "U.S. House - District 3",
    party: "D",
    since: "2019",
    district: "District 3",
    website: "https://lee.house.gov/",
    townHall: "https://lee.house.gov/contact",
    twitter: "https://twitter.com/RepSusieLee",
    facebook: "https://www.facebook.com/RepSusieLee/",
    email: "Contact through website form",
    votingRecord: { education: 85, environment: 88, healthcare: 90 }
  },
  {
    name: "Steven Horsford",
    chamber: "U.S. House - District 4",
    party: "D",
    since: "2019",
    district: "District 4",
    website: "https://horsford.house.gov/",
    townHall: "https://horsford.house.gov/contact",
    twitter: "https://twitter.com/RepHorsford",
    facebook: "https://www.facebook.com/RepHorsford/",
    email: "Contact through website form",
    votingRecord: { education: 82, environment: 85, healthcare: 88 }
  },
];

const stateReps = [
  {
    name: "Dontae Lee",
    chamber: "State Assembly - District 1",
    party: "D",
    district: "District 1",
    website: "https://leg.state.nv.us",
    twitter: "https://twitter.com",
    email: "dlee@legis.nv.gov",
    votingRecord: { education: 80, environment: 75, housing: 70 }
  },
  {
    name: "Rochelle Garner",
    chamber: "State Senate - District 5",
    party: "D",
    district: "District 5",
    website: "https://leg.state.nv.us",
    twitter: "https://twitter.com",
    email: "rgarner@legis.nv.gov",
    votingRecord: { education: 85, environment: 88, housing: 82 }
  },
  {
    name: "Jesse Young",
    chamber: "State Assembly - District 7",
    party: "R",
    district: "District 7",
    website: "https://leg.state.nv.us",
    twitter: "https://twitter.com",
    email: "jyoung@legis.nv.gov",
    votingRecord: { education: 60, environment: 45, housing: 55 }
  },
];

function Representatives() {
  const [selectedDistrict, setSelectedDistrict] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("education");
  const [expandedRep, setExpandedRep] = useState(null);

  const districts = ["all", "District 1", "District 2", "District 3", "District 4", "District 5", "Nevada"];

  const filteredFederalReps = selectedDistrict === "all" 
    ? federalReps 
    : federalReps.filter(rep => rep.district === selectedDistrict || selectedDistrict === "all");

  const filteredStateReps = selectedDistrict === "all"
    ? stateReps
    : stateReps.filter(rep => rep.district === selectedDistrict || selectedDistrict === "all");

  const toggleExpanded = (name) => {
    setExpandedRep(expandedRep === name ? null : name);
  };

  const getVotingColor = (percentage) => {
    if (percentage >= 80) return "#28a745";
    if (percentage >= 60) return "#ffc107";
    if (percentage >= 40) return "#fd7e14";
    return "#dc3545";
  };

  const RepCard = ({ rep }) => (
    <div className="rep-card">
      <div className="rep-card-header">
        <div>
          <h3>{rep.name}</h3>
          <p className="rep-chamber">{rep.chamber}</p>
        </div>
        <div className={`party-badge party-${rep.party}`}>
          {rep.party === "D" ? "Democrat" : rep.party === "R" ? "Republican" : "Independent"}
        </div>
      </div>

      <div className="rep-info">
        <p><strong>District:</strong> {rep.district}</p>
        {rep.since && <p><strong>Serving since:</strong> {rep.since}</p>}
      </div>

      {rep.votingRecord && (
        <div className="voting-record">
          <h4>Voting Record on Key Issues</h4>
          <div className="voting-categories">
            {Object.entries(rep.votingRecord).map(([category, percentage]) => (
              <div key={category} className="voting-item">
                <span className="voting-label">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                <div className="voting-bar">
                  <div 
                    className="voting-fill" 
                    style={{ 
                      width: `${percentage}%`, 
                      backgroundColor: getVotingColor(percentage)
                    }}
                  ></div>
                </div>
                <span className="voting-percent">{percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rep-links">
        {rep.website && (
          <a href={rep.website} target="_blank" rel="noopener noreferrer" className="link-btn">
            Official Website
          </a>
        )}
        {rep.townHall && (
          <a href={rep.townHall} target="_blank" rel="noopener noreferrer" className="link-btn">
            Town Hall/Events
          </a>
        )}
        {rep.twitter && (
          <a href={rep.twitter} target="_blank" rel="noopener noreferrer" className="link-btn twitter">
            Twitter
          </a>
        )}
        {rep.facebook && (
          <a href={rep.facebook} target="_blank" rel="noopener noreferrer" className="link-btn facebook">
            Facebook
          </a>
        )}
      </div>

      <button 
        className="contact-btn"
        onClick={() => toggleExpanded(rep.name)}
      >
        {expandedRep === rep.name ? "Hide Contact" : "Contact Representative"}
      </button>

      {expandedRep === rep.name && (
        <div className="contact-template">
          <h4>Email Template</h4>
          <textarea
            readOnly
            value={`Dear ${rep.name},\n\nI am a constituent and a high school student interested in Nevada legislation. I wanted to reach out about issues that matter to me, particularly regarding ${selectedCategory} policy.\n\nI believe [your position] and hope you will consider the perspectives of young people in our state.\n\nThank you for your service.\n\nBest regards,\n[Your Name]`}
          />
          <p className="contact-info"><strong>Email:</strong> {rep.email}</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="reps-container">
      <div className="reps-header">
        <h1>Nevada Representatives</h1>
        <p>Find and contact your representatives at federal and state levels</p>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>Filter by District:</label>
          <select 
            value={selectedDistrict} 
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="filter-select"
          >
            {districts.map(district => (
              <option key={district} value={district}>
                {district === "all" ? "All Districts" : district}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Category Filter:</label>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            <option value="education">Education</option>
            <option value="environment">Environment</option>
            <option value="healthcare">Healthcare</option>
            <option value="housing">Housing</option>
          </select>
        </div>
      </div>

      <div className="reps-section">
        <h2>Federal Representatives</h2>
        <div className="reps-grid">
          {filteredFederalReps.map((rep, idx) => (
            <RepCard key={idx} rep={rep} />
          ))}
        </div>
      </div>

      <div className="reps-section">
        <h2>Nevada State Legislature</h2>
        <div className="reps-grid">
          {filteredStateReps.map((rep, idx) => (
            <RepCard key={idx} rep={rep} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Representatives;