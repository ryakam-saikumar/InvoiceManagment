import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // ✅ Added Navigate
import { useDispatch, useSelector } from "react-redux";
import { toggleForm } from "../store/InvoiceSlice";

import Login from "../authorizations/Login";
import Register from "../authorizations/Registration";
import PrivateRoute from "./PrivateRoute";

import Header from "./Header";
import InvoiceList from "./InvoiceList";
import Invoiceform from "./Invoiceform";
import InvoiceDetails from "./InvoiceDetails";

function Dashboard() {
  const dispatch = useDispatch();
  const { isFormOpen, selectedInvoice } = useSelector(
    (state) => state.invoices
  );

  const handleNewInvoice = () => {
    dispatch(toggleForm());
  };

  return (
    <div style={styles.dashboardContainer}>
      <div style={styles.contentWrapper}>
        <Header onNewInvoice={handleNewInvoice} />

        {selectedInvoice ? (
          <InvoiceDetails invoice={selectedInvoice} />
        ) : (
          <InvoiceList />
        )}

        {isFormOpen && <Invoiceform invoice={selectedInvoice} />}
      </div>
    </div>
  );
}

function AppContent() {
  return (
    <Routes>
      {/* Default route redirects to login */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Authentication routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected dashboard */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      {/* Catch-all redirect to login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

const styles = {
  dashboardContainer: {
    backgroundColor: "#0f172a",
    color: "white",
    minHeight: "100vh",
    padding: "40px 20px",
  },
  contentWrapper: {
    maxWidth: "1100px",
    margin: "0 auto",
  },
};

export default AppContent;
