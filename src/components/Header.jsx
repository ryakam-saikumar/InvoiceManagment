import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../store/InvoiceSlice';
import { useNavigate } from 'react-router-dom';

const status = ["all", "paid", "pending", "draft"];

function Header({ onNewInvoice }) {
  const { invoices, filter } = useSelector((state) => state.invoices);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  // Logout function with full functionality
  const navigate = useNavigate();   // ✅ Move here (TOP LEVEL)

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });  // ✅ Works now
  };
  return (
    <header className="header">
      <div className="header-left">
        <h1>Invoices</h1>
        <p>{invoices.length === 0 ? "No Invoices" : `There are ${invoices.length} Total Invoices`}</p>
      </div>

      <div className="header-right">
        <div className="menu-container">
          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {/* Filter icon as inline SVG */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 5h18v2H3V5zm4 6h10v2H7v-2zm6 6H9v2h4v-2z" />
            </svg>
            <span>Filter by Status</span>
          </button>
          {menuOpen && (
            <div className="menu-items">
              {status.map((s) => (
                <button
                  key={s}
                  className={`menu-item ${filter === s ? "active" : ""}`}
                  onClick={() => {
                    dispatch(setFilter(s));
                    setMenuOpen(false);
                  }}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>

        <button className="new-invoice-btn" onClick={onNewInvoice}>
          {/* Plus icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span>New Invoice</span>
        </button>

        <button className="logout-btn" onClick={handleLogout}>
          {/* Logout icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 17l5-5-5-5M21 12H9M13 19v2H5V3h8v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Logout</span>
        </button>
      </div>

      <style>{`
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          background-color: #1e293b;
          color: white;
          border-bottom: 1px solid #334155;
        }
        .header-left h1 {
          font-size: 24px;
          margin: 0 0 4px 0;
        }
        .header-left p {
          margin: 0;
          color: #94a3b8;
        }
        .header-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .menu-container {
          position: relative;
        }
        .menu-button {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 8px 12px;
          border-radius: 8px;
        }
        .menu-button:hover {
          background-color: #334155;
        }
        .menu-items {
          position: absolute;
          right: 0;
          top: 100%;
          margin-top: 8px;
          background-color: #1e293b;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          overflow: hidden;
          z-index: 10;
          min-width: 160px;
        }
        .menu-item {
          display: block;
          width: 100%;
          text-align: left;
          padding: 8px 16px;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
        }
        .menu-item:hover {
          background-color: #334155;
        }
        .menu-item.active {
          color: #8b5cf6;
        }
        .new-invoice-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: #8b5cf6;
          color: white;
          border: none;
          border-radius: 9999px;
          padding: 8px 16px;
          cursor: pointer;
        }
        .new-invoice-btn:hover {
          background-color: #7c3aed;
        }
        .logout-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: #ef4444;
          color: white;
          border: none;
          border-radius: 9999px;
          padding: 8px 16px;
          cursor: pointer;
        }
        .logout-btn:hover {
          background-color: #dc2626;
        }
      `}</style>
    </header>
  );
}

export default Header;
