import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

function BillList() {
  const [billsGrouped, setBillsGrouped] = useState({});
  const [expandedGroups, setExpandedGroups] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/bills/grouped")
      .then((res) => res.json())
      .then((data) => {
        setBillsGrouped(data);
        const allExpanded = {};
        Object.keys(data).forEach(type => {
          allExpanded[type] = true;
        });
        setExpandedGroups(allExpanded);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bills:", err);
        setLoading(false);
      });
  }, []);

  const toggleGroup = (billType) => {
    setExpandedGroups(prev => ({
      ...prev,
      [billType]: !prev[billType]
    }));
  };

  const getFilteredGroups = () => {
    const filtered = {};
    
    Object.entries(billsGrouped).forEach(([billType, bills]) => {
      if (!Array.isArray(bills)) {
        return;
      }
      
      const filteredBills = bills.filter(bill =>
        bill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.summary.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      if (filteredBills.length > 0) {
        filtered[billType] = filteredBills;
      }
    });
    
    return filtered;
  };

  const filteredGroups = getFilteredGroups();
  const billTypeOrder = ["AB", "SB", "HB", "SCR", "HCR", "SR", "HR"];
  const sortedBillTypes = Object.keys(filteredGroups).sort((a, b) => {
    const aIndex = billTypeOrder.indexOf(a);
    const bIndex = billTypeOrder.indexOf(b);
    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
  });

  const totalBills = Object.values(filteredGroups).reduce((sum, bills) => sum + bills.length, 0);

  if (loading) {
    return (
      <div className="container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading bills...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="bills-header">
        <h1 className="page-title">Nevada Youth Policy Tracker</h1>
        <p className="bills-subtitle">Browse and vote on Nevada legislation</p>
      </div>

      {/* Modern Search Bar */}
      <div className="search-container">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search bills by name, ID, or topic..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </div>
      </div>

      {/* Results Summary */}
      <div className="results-summary">
        <p>Showing <strong>{totalBills}</strong> bill{totalBills !== 1 ? 's' : ''} across <strong>{sortedBillTypes.length}</strong> categor{sortedBillTypes.length !== 1 ? 'ies' : 'y'}</p>
      </div>

      {/* Bill Groups */}
      <div className="bill-groups">
        {sortedBillTypes.length === 0 ? (
          <div className="no-results">
            <p>No bills found matching your search.</p>
          </div>
        ) : (
          sortedBillTypes.map((billType) => (
            <div key={billType} className="bill-group">
              <div
                className="bill-group-header"
                onClick={() => toggleGroup(billType)}
              >
                <div className="group-title-wrapper">
                  <span className="bill-type-badge">{billType}</span>
                  <span className="group-title">
                    {billType} Bills
                  </span>
                  <span className="bill-count">
                    {filteredGroups[billType].length}
                  </span>
                </div>
                <span className={`toggle-icon ${expandedGroups[billType] ? 'expanded' : ''}`}>
                  ▼
                </span>
              </div>

              {expandedGroups[billType] && (
                <div className="bill-grid">
                  {filteredGroups[billType].map((bill) => (
                    <Link
                      to={`/bill/${bill.id}`}
                      key={bill.id}
                      className="bill-card"
                    >
                      <div className="bill-card-header">
                        <span className="bill-id">{bill.id}</span>
                        <span className={`bill-status ${bill.status.toLowerCase().replace(/\s+/g, '-')}`}>
                          {bill.status}
                        </span>
                      </div>
                      <h2 className="bill-title">{bill.name}</h2>
                      <p className="bill-summary">{bill.summary}</p>
                      <p className="bill-date">Introduced: {bill.date_introduced}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BillList;