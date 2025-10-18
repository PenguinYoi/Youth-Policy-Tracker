

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
    townHall: "https://lasvegas.primegov.com/public/portal",
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
    townHall: "https://lasvegas.primegov.com/public/portal",
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
    townHall: "https://lasvegas.primegov.com/public/portal",
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
    townHall: "https://lasvegas.primegov.com/public/portal",
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
    townHall: "https://lasvegas.primegov.com/public/portal",
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
    townHall: "https://lasvegas.primegov.com/public/portal",
    email: "Contact through website form",
    votingRecord: { education: 82, environment: 85, healthcare: 88 }
  },
];

const stateReps = [
  {
    "firstName": "Michelee",
    "lastName": "Cruz-Crawford",
    "name": "Michelee Cruz-Crawford",
    "chamber": "State Senate - District 1",
    "party": "D",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Senate/Current/1",
    "twitter": "",
    "email": "Shelly.Cruzcrawford@sen.state.nv.us"
  },
  {
    "firstName": "Edgar",
    "lastName": "Flores",
    "name": "Edgar Flores",
    "chamber": "State Senate - District 2",
    "party": "D",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Senate/Current/2",
    "twitter": "",
    "email": "Edgar.Flores@sen.state.nv.us"
  },
  {
    "firstName": "Rochelle",
    "lastName": "Nguyen",
    "name": "Rochelle Nguyen",
    "chamber": "State Senate - District 3",
    "party": "D",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Senate/Current/3",
    "twitter": "",
    "email": "Rochelle.Nguyen@sen.state.nv.us"
  },
  {
    "firstName": "Dina",
    "lastName": "Neal",
    "name": "Dina Neal",
    "chamber": "State Senate - District 4",
    "party": "D",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Senate/Current/4",
    "twitter": "",
    "email": "Dina.Neal@sen.state.nv.us"
  },
  {
    "firstName": "Carrie",
    "lastName": "Buck",
    "name": "Carrie Buck",
    "chamber": "State Senate - District 5",
    "party": "R",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Senate/Current/5",
    "twitter": "",
    "email": "Carrie.Buck@sen.state.nv.us"
  },
  {
    "firstName": "Nicole",
    "lastName": "Cannizzaro",
    "name": "Nicole Cannizzaro",
    "chamber": "State Senate - District 6",
    "party": "D",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Senate/Current/6",
    "twitter": "",
    "email": "Nicole.Cannizzaro@sen.state.nv.us"
  },
  {
    "firstName": "Roberta",
    "lastName": "Lange",
    "name": "Roberta Lange",
    "chamber": "State Senate - District 7",
    "party": "D",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Senate/Current/7",
    "twitter": "",
    "email": "Roberta.Lange@sen.state.nv.us"
  },
  {
    "firstName": "Marilyn",
    "lastName": "Dondero Loop",
    "name": "Marilyn Dondero Loop",
    "chamber": "State Senate - District 8",
    "party": "D",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Senate/Current/8",
    "twitter": "",
    "email": "Marilyn.Dondero Loop@sen.state.nv.us"
  },
  {
    "firstName": "Melanie",
    "lastName": "Scheible",
    "name": "Melanie Scheible",
    "chamber": "State Senate - District 9",
    "party": "D",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Senate/Current/9",
    "twitter": "",
    "email": "Melanie.Scheible@sen.state.nv.us"
  },
  {
    "firstName": "Fabian",
    "lastName": "Doñate",
    "name": "Fabian Doñate",
    "chamber": "State Senate - District 10",
    "party": "D",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Senate/Current/10",
    "twitter": "",
    "email": "Fabian.Doñate@sen.state.nv.us"
  },
  {
    "firstName": "Lori",
    "lastName": "Rogich",
    "name": "Lori Rogich",
    "chamber": "State Senate - District 11",
    "party": "R",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Senate/Current/11",
    "twitter": "",
    "email": "Lori.Rogich@sen.state.nv.us"
  },
  {
    "firstName": "Julie",
    "lastName": "Pazina",
    "name": "Julie Pazina",
    "chamber": "State Senate - District 12",
    "party": "D",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Senate/Current/12",
    "twitter": "",
    "email": "Julie.Pazina@sen.state.nv.us"
  },
  {
    "firstName": "Skip",
    "lastName": "Daly",
    "name": "Skip Daly",
    "chamber": "State Senate - District 13",
    "party": "D",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Senate/Current/13",
    "twitter": "",
    "email": "Skip.Daly@sen.state.nv.us"
  },
  {
    "firstName": "Ira",
    "lastName": "Hansen",
    "name": "Ira Hansen",
    "chamber": "State Senate - District 14",
    "party": "R",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Senate/Current/14",
    "twitter": "",
    "email": "Ira.Hansen@sen.state.nv.us"
  },
  {
    "firstName": "Eureka",
    "lastName": "Elko (Part)",
    "name": "Eureka Elko (Part)",
    "chamber": "State Senate - District 14",
    "party": "R",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Senate/Current/14",
    "twitter": "",
    "email": "Eureka.Elko (Part)@sen.state.nv.us"
  },
  {
    "firstName": "Angela",
    "lastName": "Taylor",
    "name": "Angela Taylor",
    "chamber": "State Senate - District 15",
    "party": "D",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Senate/Current/15",
    "twitter": "",
    "email": "Angela.Taylor@sen.state.nv.us"
  },
  {
    "firstName": "Lisa",
    "lastName": "Krasner",
    "name": "Lisa Krasner",
    "chamber": "State Senate - District 16",
    "party": "R",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Senate/Current/16",
    "twitter": "",
    "email": "Lisa.Krasner@sen.state.nv.us"
  },
  {
    "firstName": "Storey",
    "lastName": "Carson City",
    "name": "Storey Carson City",
    "chamber": "State Senate - District 16",
    "party": "R",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Senate/Current/16",
    "twitter": "",
    "email": "Storey.Carson City@sen.state.nv.us"
  },
  {
    "firstName": "Robin",
    "lastName": "Titus",
    "name": "Robin Titus",
    "chamber": "State Senate - District 17",
    "party": "R",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Senate/Current/17",
    "twitter": "",
    "email": "Robin.Titus@sen.state.nv.us"
  },
  {
    "firstName": "Douglas",
    "lastName": "Churchill",
    "name": "Douglas Churchill",
    "chamber": "State Senate - District 17",
    "party": "R",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Senate/Current/17",
    "twitter": "",
    "email": "Douglas.Churchill@sen.state.nv.us"
  },
  {
    "firstName": "John",
    "lastName": "Steinbeck",
    "name": "John Steinbeck",
    "chamber": "State Senate - District 18",
    "party": "R",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Senate/Current/18",
    "twitter": "",
    "email": "John.Steinbeck@sen.state.nv.us"
  },
  {
    "firstName": "John",
    "lastName": "Ellison",
    "name": "John Ellison",
    "chamber": "State Senate - District 19",
    "party": "R",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Senate/Current/19",
    "twitter": "",
    "email": "John.Ellison@sen.state.nv.us"
  },
  {
    "firstName": "Jeff",
    "lastName": "Stone",
    "name": "Jeff Stone",
    "chamber": "State Senate - District 20",
    "party": "R",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Senate/Current/20",
    "twitter": "",
    "email": "Jeff.Stone@sen.state.nv.us"
  },
  {
    "firstName": "James",
    "lastName": "Ohrenschall",
    "name": "James Ohrenschall",
    "chamber": "State Senate - District 21",
    "party": "D",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Senate/Current/21",
    "twitter": "",
    "email": "James.Ohrenschall@sen.state.nv.us"
  },
  {
    "name": "Daniele Monroe-Moreno",
    "chamber": "State Assembly - District 1",
    "party": "D",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Assembly/Current/1",
    "twitter": "",
    "email": "Daniele.MonroeMoreno@asm.state.nv.us"
  },
  {
    "name": "Heidi Kasama",
    "chamber": "State Assembly - District 2",
    "party": "R",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Assembly/Current/2",
    "twitter": "",
    "email": "Heidi.Kasama@asm.state.nv.us"
  },
  {
    "name": "Selena Torres",
    "chamber": "State Assembly - District 3",
    "party": "D",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Assembly/Current/3",
    "twitter": "",
    "email": "Selena.Torres@asm.state.nv.us"
  },
  {
    "name": "Lisa Cole",
    "chamber": "State Assembly - District 4",
    "party": "R",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Assembly/Current/4",
    "twitter": "",
    "email": "Lisa.Cole@asm.state.nv.us"
  },
  {
    "name": "Brittney Miller",
    "chamber": "State Assembly - District 5",
    "party": "D",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Assembly/Current/5",
    "twitter": "",
    "email": "Brittney.Miller@asm.state.nv.us"
  },
  {
    "name": "Jovan Jackson",
    "chamber": "State Assembly - District 6",
    "party": "D",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Assembly/Current/6",
    "twitter": "",
    "email": "Jovan.Jackson@asm.state.nv.us"
  },
  {
    "name": "Tanya Flanagan",
    "chamber": "State Assembly - District 7",
    "party": "D",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Assembly/Current/7",
    "twitter": "",
    "email": "Tanya.Flanagan@asm.state.nv.us"
  },
  {
    "name": "Duy Nguyen",
    "chamber": "State Assembly - District 8",
    "party": "D",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Assembly/Current/8",
    "twitter": "",
    "email": "Duy.Nguyen@asm.state.nv.us"
  },
  {
    "name": "Steve Yeager",
    "chamber": "State Assembly - District 9",
    "party": "D",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Assembly/Current/9",
    "twitter": "",
    "email": "Steve.Yeager@asm.state.nv.us"
  },
  {
    "name": "Venise Karris",
    "chamber": "State Assembly - District 10",
    "party": "D",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Assembly/Current/10",
    "twitter": "",
    "email": "Venise.Karris@asm.state.nv.us"
  },
  {
    "name": "Cinthia Moore",
    "chamber": "State Assembly - District 11",
    "party": "D",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Assembly/Current/11",
    "twitter": "",
    "email": "Cinthia.Moore@asm.state.nv.us"
  },
  {
    "name": "Max Carter",
    "chamber": "State Assembly - District 12",
    "party": "D",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Assembly/Current/12",
    "twitter": "",
    "email": "Max.Carter@asm.state.nv.us"
  },
  {
    "name": "Brian Hibbetts",
    "chamber": "State Assembly - District 13",
    "party": "R",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Assembly/Current/13",
    "twitter": "",
    "email": "Brian.Hibbetts@asm.state.nv.us"
  },
  {
    "name": "Erica Mosca",
    "chamber": "State Assembly - District 14",
    "party": "D",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Assembly/Current/14",
    "twitter": "",
    "email": "Erica.Mosca@asm.state.nv.us"
  },
  {
    "name": "Howard Watts",
    "chamber": "State Assembly - District 15",
    "party": "D",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Assembly/Current/15",
    "twitter": "",
    "email": "Howard.Watts@asm.state.nv.us"
  },
  {
    "name": "Cecelia González",
    "chamber": "State Assembly - District 16",
    "party": "D",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Assembly/Current/16",
    "twitter": "",
    "email": "Cecelia.Gonzalez@asm.state.nv.us"
  },
  {
    "name": "Linda Hunt",
    "chamber": "State Assembly - District 17",
    "party": "D",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Assembly/Current/17",
    "twitter": "",
    "email": "Linda.Hunt@asm.state.nv.us"
  },
  {
    "name": "Venicia Considine",
    "chamber": "State Assembly - District 18",
    "party": "D",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Assembly/Current/18",
    "twitter": "",
    "email": "Venicia.Considine@asm.state.nv.us"
  },
  {
    "name": "David Orentlicher",
    "chamber": "State Assembly - District 20",
    "party": "D",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Assembly/Current/20",
    "twitter": "",
    "email": "David.Orentlicher@asm.state.nv.us"
  },
  {
    "name": "Elaine Marzola",
    "chamber": "State Assembly - District 21",
    "party": "D",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Assembly/Current/21",
    "twitter": "",
    "email": "Elaine.Marzola@asm.state.nv.us"
  },
  {
    "name": "Melissa Hardy",
    "chamber": "State Assembly - District 22",
    "party": "R",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Assembly/Current/22",
    "twitter": "",
    "email": "Melissa.Hardy@asm.state.nv.us"
  },
  {
    "name": "Danielle Gallant",
    "chamber": "State Assembly - District 23",
    "party": "R",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Assembly/Current/23",
    "twitter": "",
    "email": "Danielle.Gallant@asm.state.nv.us"
  },
  {
    "name": "Erica Roth",
    "chamber": "State Assembly - District 24",
    "party": "D",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Assembly/Current/24",
    "twitter": "",
    "email": "Erica.Roth@asm.state.nv.us"
  },
  {
    "name": "Selena La Rue Hatch",
    "chamber": "State Assembly - District 25",
    "party": "D",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Assembly/Current/25",
    "twitter": "",
    "email": "Selena.Hatch@asm.state.nv.us"
  },
  {
    "name": "Rich DeLong",
    "chamber": "State Assembly - District 26",
    "party": "R",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Assembly/Current/26",
    "twitter": "",
    "email": "Rich.DeLong@asm.state.nv.us"
  },
  {
    "name": "Heather Goulding",
    "chamber": "State Assembly - District 27",
    "party": "D",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Assembly/Current/27",
    "twitter": "",
    "email": "Heather.Goulding@asm.state.nv.us"
  },
  {
    "name": "Reuben D'Silva",
    "chamber": "State Assembly - District 28",
    "party": "D",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Assembly/Current/28",
    "twitter": "",
    "email": "Reuben.DSilva@asm.state.nv.us"
  },
  {
    "name": "Joe Dalia",
    "chamber": "State Assembly - District 29",
    "party": "D",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Assembly/Current/29",
    "twitter": "",
    "email": "Joe.Dalia@asm.state.nv.us"
  },
  {
    "name": "Natha Anderson",
    "chamber": "State Assembly - District 30",
    "party": "D",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Assembly/Current/30",
    "twitter": "",
    "email": "Natha.Anderson@asm.state.nv.us"
  },
  {
    "name": "Jill Dickman",
    "chamber": "State Assembly - District 31",
    "party": "R",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Assembly/Current/31",
    "twitter": "",
    "email": "Jill.Dickman@asm.state.nv.us"
  },
  {
    "name": "Alexis Hansen",
    "chamber": "State Assembly - District 32",
    "party": "R",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Assembly/Current/32",
    "twitter": "",
    "email": "Alexis.Hansen@asm.state.nv.us"
  },
  {
    "name": "Bert Gurr",
    "chamber": "State Assembly - District 33",
    "party": "R",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Assembly/Current/33",
    "twitter": "",
    "email": "Bert.Gurr@asm.state.nv.us"
  },
  {
    "name": "Hanadi Nadeem",
    "chamber": "State Assembly - District 34",
    "party": "D",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Assembly/Current/34",
    "twitter": "",
    "email": "Hanadi.Nadeem@asm.state.nv.us"
  },
  {
    "name": "Rebecca Edgeworth",
    "chamber": "State Assembly - District 35",
    "party": "R",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Assembly/Current/35",
    "twitter": "",
    "email": "Rebecca.Edgeworth@asm.state.nv.us"
  },
  {
    "name": "Gregory Hafen",
    "chamber": "State Assembly - District 36",
    "party": "R",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Assembly/Current/36",
    "twitter": "",
    "email": "Gregory.Hafen@asm.state.nv.us"
  },
  {
    "name": "Shea Backus",
    "chamber": "State Assembly - District 37",
    "party": "D",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Assembly/Current/37",
    "twitter": "",
    "email": "Shea.Backus@asm.state.nv.us"
  },
  {
    "name": "Gregory Koenig",
    "chamber": "State Assembly - District 38",
    "party": "R",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Assembly/Current/38",
    "twitter": "",
    "email": "Gregory.Koenig@asm.state.nv.us"
  },
  {
    "name": "Shondra Summers-Armstrong",
    "chamber": "State Assembly - District 39",
    "party": "D",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Assembly/Current/39",
    "twitter": "",
    "email": "Shondra.SummersArmstrong@asm.state.nv.us"
  },
  {
    "name": "P.K. O'Neill",
    "chamber": "State Assembly - District 40",
    "party": "R",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Assembly/Current/40",
    "twitter": "",
    "email": "PK.ONeill@asm.state.nv.us"
  },
  {
    "name": "Sandra Jauregui",
    "chamber": "State Assembly - District 41",
    "party": "D",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Assembly/Current/41",
    "twitter": "",
    "email": "Sandra.Jauregui@asm.state.nv.us"
  },
  {
    "name": "Tracy Brown-May",
    "chamber": "State Assembly - District 42",
    "party": "D",
    "website": "https://www.leg.state.nv.us/App/Legislator/A/Assembly/Current/42",
    "twitter": "",
    "email": "Tracy.BrownMay@asm.state.nv.us"
  }
]

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

      {/* <div className="rep-info">
        <p><strong>Email:</strong> {rep.email}</p>
        {rep.since && <p><strong>Serving since:</strong> {rep.since}</p>}
      </div> */}

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