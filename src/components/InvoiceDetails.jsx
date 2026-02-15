import { format, parseISO } from "date-fns";
import React from "react";
import { useDispatch } from "react-redux";
import {
  markAsPaid,
  deleteInvoice,
  setSelectedInvoice,
  toggleForm,
} from "../store/InvoiceSlice";

function InvoiceDetails({ invoice }) {
  const dispatch = useDispatch();

  if (!invoice) {
    return (
      <div style={styles.noInvoice}>
        No Invoice Selected
      </div>
    );
  }

  const handleMarkAsPaid = () => {
    dispatch(markAsPaid(invoice.id));
  };

  const handleEdit = () => {
    dispatch(toggleForm());
  };

  const handleDelete = () => {
    dispatch(deleteInvoice(invoice.id));
    dispatch(setSelectedInvoice(null));
  };

  const formatDate = (dateString) => {
    try {
      return format(parseISO(dateString), "dd MMM yyyy");
    } catch {
      return "Invalid Date";
    }
  };

  const totalAmount =
    invoice.items?.reduce((acc, item) => acc + (item.total || 0), 0) || 0;

  return (
    <div style={styles.container}>
      {/* Status Section */}
      <div style={styles.statusBar}>
        <div style={styles.statusLeft}>
          <span>Status</span>
          <div
            style={{
              ...styles.statusBox,
              backgroundColor:
                invoice.status === "paid"
                  ? "#14532d"
                  : invoice.status === "pending"
                  ? "#7c2d12"
                  : "#334155",
            }}
          >
            {invoice.status}
          </div>
        </div>

        <div>
          <button style={styles.editBtn} onClick={handleEdit}>
            Edit
          </button>
          <button style={styles.deleteBtn} onClick={handleDelete}>
            Delete
          </button>
          {invoice.status !== "paid" && (
            <button style={styles.paidBtn} onClick={handleMarkAsPaid}>
              Mark as Paid
            </button>
          )}
        </div>
      </div>

      {/* Invoice Body */}
      <div style={styles.invoiceBody}>
        <div style={styles.header}>
          <div>
            <h2>#{invoice.id}</h2>
            <p style={styles.lightText}>
              {invoice.projectDescription}
            </p>
          </div>

          <div style={styles.rightText}>
            <p>{invoice.billFrom?.streetAddress}</p>
            <p>{invoice.billFrom?.city}</p>
            <p>{invoice.billFrom?.postcode}</p>
            <p>{invoice.billFrom?.country}</p>
          </div>
        </div>

        <div style={styles.grid}>
          <div>
            <p style={styles.lightText}>Invoice Date</p>
            <p><strong>{formatDate(invoice.invoiceDate)}</strong></p>

            <p style={{ ...styles.lightText, marginTop: 15 }}>
              Payment Due
            </p>
            <p><strong>{formatDate(invoice.dueDate)}</strong></p>
          </div>

          <div>
            <p style={styles.lightText}>Bill To</p>
            <p><strong>{invoice.clientName}</strong></p>
            <p style={styles.lightText}>
              {invoice.billTo?.streetAddress}
            </p>
            <p style={styles.lightText}>
              {invoice.billTo?.city}
            </p>
            <p style={styles.lightText}>
              {invoice.billTo?.postcode}
            </p>
            <p style={styles.lightText}>
              {invoice.billTo?.country}
            </p>
          </div>

          <div>
            <p style={styles.lightText}>Sent To</p>
            <p><strong>{invoice.billTo?.clientEmail}</strong></p>
          </div>
        </div>

        {/* Items Table */}
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHead}>
                <th style={styles.left}>Item Name</th>
                <th>Qty</th>
                <th>Price</th>
                <th style={styles.right}>Total</th>
              </tr>
            </thead>

            <tbody>
              {invoice.items?.map((item, index) => (
                <tr key={index}>
                  <td style={styles.left}>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.price || 0).toFixed(2)}</td>
                  <td style={styles.right}>
                    ${(item.total || 0).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={styles.totalBar}>
            <span>Amount Due</span>
            <span style={styles.totalAmount}>
              ${totalAmount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#1e293b",
    padding: "30px",
    borderRadius: "10px",
    color: "white",
    maxWidth: "1000px",
    margin: "30px auto",
    fontFamily: "Arial, sans-serif",
  },
  noInvoice: {
    color: "white",
    textAlign: "center",
    padding: "50px",
  },
  statusBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },
  statusLeft: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  statusBox: {
    padding: "6px 15px",
    borderRadius: "20px",
    textTransform: "capitalize",
  },
  editBtn: {
    backgroundColor: "#334155",
    color: "white",
    padding: "8px 15px",
    border: "none",
    borderRadius: "20px",
    marginRight: "10px",
    cursor: "pointer",
  },
  deleteBtn: {
    backgroundColor: "#ef4444",
    color: "white",
    padding: "8px 15px",
    border: "none",
    borderRadius: "20px",
    marginRight: "10px",
    cursor: "pointer",
  },
  paidBtn: {
    backgroundColor: "#7c3aed",
    color: "white",
    padding: "8px 15px",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
  },
  invoiceBody: {
    backgroundColor: "#0f172a",
    padding: "25px",
    borderRadius: "10px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "25px",
  },
  rightText: {
    textAlign: "right",
    color: "#94a3b8",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "25px",
    marginBottom: "25px",
  },
  lightText: {
    color: "#94a3b8",
  },
  tableContainer: {
    backgroundColor: "#1e293b",
    borderRadius: "8px",
    overflow: "hidden",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "center",
  },
  tableHead: {
    backgroundColor: "#0f172a",
    color: "#94a3b8",
  },
  left: {
    textAlign: "left",
    padding: "10px",
  },
  right: {
    textAlign: "right",
    padding: "10px",
  },
  totalBar: {
    backgroundColor: "#0f172a",
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    fontWeight: "bold",
  },
  totalAmount: {
    fontSize: "20px",
  },
};

export default InvoiceDetails;
