import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

function BillList() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/bills")
      .then((res) => res.json())
      .then((data) => setBills(data))
      .catch((err) => console.error("Error fetching bills:", err));
  }, []);

  if (bills.length === 0) return <p>Loading bills...</p>;

  return (
    <div className="container">
      <h1 className="page-title">Nevada Youth Policy Tracker - Bills</h1>
      <div className="bill-grid">
        {bills.map((bill) => (
          <Link to={`/bill/${bill.id}`} key={bill.id} className="bill-card">
            <h2 className="bill-title">{bill.name}</h2>
            <p><strong>ID:</strong> {bill.id}</p>
            <p><strong>Status:</strong> {bill.status}</p>
            <p><strong>Date Introduced:</strong> {bill.date_introduced}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BillList;
