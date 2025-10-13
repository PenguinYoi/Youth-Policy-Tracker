import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./styles.css";

function BillDetails() {
  const { id } = useParams();
  const [bill, setBill] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/bills/${id}`)
      .then((res) => res.json())
      .then((data) => setBill(data))
      .catch((err) => console.error("Error fetching bill:", err));
  }, [id]);

  if (!bill) return <p>Loading bill details...</p>;

  return (
    <div className="container">
      <h1 className="page-title">{bill.name}</h1>
      <div className="bill-detail-card">
        <p><strong>ID:</strong> {bill.id}</p>
        <p><strong>Status:</strong> {bill.status}</p>
        <p><strong>Date Introduced:</strong> {bill.date_introduced}</p>
        <p><strong>Summary:</strong> {bill.summary}</p>
        <a href={bill.link} target="_blank" rel="noopener noreferrer" className="button">
          View Official Bill Page
        </a>
        <Link to="/bills" className="button back-button">
          ← Back to Bills
        </Link>
      </div>
    </div>
  );
}

export default BillDetails;
