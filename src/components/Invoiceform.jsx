import { Plus, Trash2, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addInvoice, toggleForm, updateInvoice } from "../store/InvoiceSlice";
import { addDays, format } from "date-fns";

function Invoiceform({ invoice }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(() => {
    if (invoice) return { ...invoice };

    return {
      id: `INV${Math.floor(Math.random() * 10000)}`,
      status: "pending",
      billFrom: { streetAddress: "", city: "", postCode: "", country: "" },
      billTo: {
        clientName: "",
        clientEmail: "",
        streetAddress: "",
        city: "",
        postCode: "",
        country: "",
      },
      clientName: "",
      items: [],
      paymentTerms: "Next 30 Days",
      projectdescription: "",
      invoiceDate: format(new Date(), "yyyy-MM-dd"),
      dueDate: format(addDays(new Date(), 30), "yyyy-MM-dd"),
    };
  });

  useEffect(() => {
    if (invoice) setFormData(invoice);
  }, [invoice]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (invoice) dispatch(updateInvoice(formData));
    else dispatch(addInvoice(formData));
    dispatch(toggleForm());
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { name: "", quantity: 0, price: 0, total: 0 }],
    });
  };

  const removeItem = (index) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    });
  };

  const updateItem = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;

    if (field === "quantity" || field === "price") {
      const qty = field === "quantity" ? value : newItems[index].quantity;
      const price = field === "price" ? value : newItems[index].price;
      newItems[index].total = qty * price;
    }

    setFormData({ ...formData, items: newItems });
  };

  return (
    <>
      <style>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.85);
          display: flex;
          justify-content: center;
          align-items: flex-start;
          overflow-y: auto;
          padding: 40px 0;
        }

        .invoice-container {
          background: linear-gradient(145deg, #1e293b, #0f172a);
          width: 100%;
          max-width: 750px;
          padding: 35px;
          border-radius: 15px;
          color: #fff;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
        }

        .form-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
        }

        .form-header h2 {
          color: #38bdf8;
        }

        .invoice-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        input, select {
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #334155;
          background: #0f172a;
          color: white;
          font-size: 14px;
          transition: 0.3s;
        }

        input:focus, select:focus {
          border-color: #38bdf8;
          outline: none;
          box-shadow: 0 0 5px #38bdf8;
        }

        .section-title {
          margin-top: 20px;
          font-weight: bold;
          color: #a78bfa;
        }

        .grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
        }

        .grid-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }

        .item-row {
          display: grid;
          grid-template-columns: 3fr 1fr 1fr 1fr auto;
          gap: 10px;
          align-items: center;
        }

        .item-total {
          text-align: right;
          font-weight: bold;
        }

        .add-item-btn {
          background: linear-gradient(90deg, #22c55e, #16a34a);
          border: none;
          padding: 12px;
          border-radius: 8px;
          color: white;
          cursor: pointer;
          margin-top: 10px;
          transition: 0.3s;
        }

        .add-item-btn:hover {
          transform: scale(1.05);
        }

        .button-group {
          display: flex;
          justify-content: flex-end;
          gap: 15px;
          margin-top: 20px;
        }

        .cancel-btn {
          background: #ef4444;
          padding: 10px 20px;
          border-radius: 20px;
          border: none;
          color: white;
          cursor: pointer;
        }

        .cancel-btn:hover {
          background: #b91c1c;
        }

        .submit-btn {
          background: linear-gradient(90deg, #3b82f6, #2563eb);
          padding: 10px 20px;
          border-radius: 20px;
          border: none;
          color: white;
          cursor: pointer;
        }

        .submit-btn:hover {
          transform: scale(1.05);
        }
      `}</style>

      <div className="modal-overlay">
        <div className="invoice-container">
          <div className="form-header">
            <h2>{invoice ? "Edit Invoice" : "New Invoice"}</h2>
            <button onClick={() => dispatch(toggleForm())}>
              <X size={24} />
            </button>
          </div>

          <form className="invoice-form" onSubmit={handleSubmit}>
            <h3 className="section-title">Bill From</h3>
            <input
              placeholder="Street Address"
              value={formData.billFrom.streetAddress}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billFrom: { ...formData.billFrom, streetAddress: e.target.value },
                })
              }
            />

            <div className="grid-3">
              <input placeholder="City"
                value={formData.billFrom.city}
                onChange={(e)=>setFormData({...formData,billFrom:{...formData.billFrom,city:e.target.value}})}
              />
              <input placeholder="Post Code"
                value={formData.billFrom.postCode}
                onChange={(e)=>setFormData({...formData,billFrom:{...formData.billFrom,postCode:e.target.value}})}
              />
              <input placeholder="Country"
                value={formData.billFrom.country}
                onChange={(e)=>setFormData({...formData,billFrom:{...formData.billFrom,country:e.target.value}})}
              />
            </div>

            <h3 className="section-title">Items</h3>

            {formData.items.map((item, index) => (
              <div className="item-row" key={index}>
                <input
                  placeholder="Item Name"
                  value={item.name}
                  onChange={(e) => updateItem(index, "name", e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={(e) =>
                    updateItem(index, "quantity", parseInt(e.target.value) || 0)
                  }
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={item.price}
                  onChange={(e) =>
                    updateItem(index, "price", parseFloat(e.target.value) || 0)
                  }
                />
                <div className="item-total">${item.total.toFixed(2)}</div>
                <button type="button" onClick={() => removeItem(index)}>
                  <Trash2 size={18} />
                </button>
              </div>
            ))}

            <button type="button" className="add-item-btn" onClick={addItem}>
              <Plus size={18} /> Add New Item
            </button>

            <div className="button-group">
              <button type="button" className="cancel-btn"
                onClick={()=>dispatch(toggleForm())}>
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                {invoice ? "Save Changes" : "Create Invoice"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Invoiceform;
