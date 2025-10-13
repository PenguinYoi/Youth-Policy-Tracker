import React from "react";
import "./representatives.css";

const reps = [
  {
    name: "Catherine Cortez Masto",
    chamber: "U.S. Senate",
    party: "D",
    since: "2017",
    website: "https://www.cortezmasto.senate.gov/",
    townHall: "https://www.cortezmasto.senate.gov/contact/town-hall",
    twitter: "https://twitter.com/SenCortezMasto",
    facebook: "https://www.facebook.com/SenCortezMasto/",
  },
  {
    name: "Jacky Rosen",
    chamber: "U.S. Senate",
    party: "D",
    since: "2019",
    website: "https://www.rosen.senate.gov/",
    townHall: "https://www.rosen.senate.gov/events",
    twitter: "https://twitter.com/SenJackyRosen",
    facebook: "https://www.facebook.com/SenJackyRosen/",
  },
  {
    name: "Dina Titus",
    chamber: "U.S. House - District 1",
    party: "D",
    since: "2013",
    website: "https://titus.house.gov/",
    townHall: "https://titus.house.gov/contact",
    twitter: "https://twitter.com/RepDinaTitus",
    facebook: "https://www.facebook.com/RepDinaTitus/",
  },
  {
    name: "Mark Amodei",
    chamber: "U.S. House - District 2",
    party: "R",
    since: "2011",
    website: "https://amodei.house.gov/",
    townHall: "https://amodei.house.gov/contact",
    twitter: "https://twitter.com/RepMarkAmodei",
    facebook: "https://www.facebook.com/RepMarkAmodei/",
  },
  {
    name: "Susie Lee",
    chamber: "U.S. House - District 3",
    party: "D",
    since: "2019",
    website: "https://lee.house.gov/",
    townHall: "https://lee.house.gov/contact",
    twitter: "https://twitter.com/RepSusieLee",
    facebook: "https://www.facebook.com/RepSusieLee/",
  },
  {
    name: "Steven Horsford",
    chamber: "U.S. House - District 4",
    party: "D",
    since: "2019",
    website: "https://horsford.house.gov/",
    townHall: "https://horsford.house.gov/contact",
    twitter: "https://twitter.com/RepHorsford",
    facebook: "https://www.facebook.com/RepHorsford/",
  },
  // You can add Nevada State Legislature members similarly
];

function Representatives() {
  return (
    <div className="reps-container">
      <h2>Nevada Representatives & Contact Info</h2>
      <div className="reps-grid">
        {reps.map((rep, idx) => (
          <div key={idx} className="rep-card">
            <h3>{rep.name}</h3>
            <p>
              <strong>{rep.chamber}</strong> ({rep.party}) <br />
              Serving since {rep.since}
            </p>
            <div className="rep-links">
              {rep.website && (
                <a href={rep.website} target="_blank" rel="noopener noreferrer">
                  Official Website
                </a>
              )}
              {rep.townHall && (
                <a href={rep.townHall} target="_blank" rel="noopener noreferrer">
                  Town Hall
                </a>
              )}
              {rep.twitter && (
                <a href={rep.twitter} target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
              )}
              {rep.facebook && (
                <a href={rep.facebook} target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Representatives;
