import React, { useState } from "react";

const itemList = [
  "ಟೊಮೊಟೋ","ಬಿನ್ಸ್","ಅಲಸಂಡೆ","ಹಸಿಮೆಣಸು","ಬದನೆಕಾಯಿ","ಹೀರೆಕಾಯಿ",
  "ಹೂಕೋಸು","ಎಲೆಕೋಸು","ಮಂ ಸೌತೆ","ಮೂಲಂಗಿ","ತೊಂಡೆಕಾಯಿ","ಬೆಂಡೆಕಾಯಿ",
  "ಆಲೂಗಡ್ಡೆ","ಕ್ಯಾರೆಟ್","ಬೂದು ಕುಂಬಳಕಾಯಿ","ಸೋರೆಕಾಯಿ","ತೆಂಗಿನಕಾಯಿ",
  "ಚೀನಿಕಾಯಿ","ಬೀಟ್ ರೂಟ್","ಗೆಡ್ಡೆಕೋಸು","ಶುಂಠಿ",
  "ಸುವರ್ಣಗೆಡ್ಡೆ","ಕೊತ್ತಂಬರಿ ಸೊಪ್ಪು","ಹರಿವೆ ಸೊಪ್ಪು","ಬಸಳೆ ಸೊಪ್ಪು",
  "ಕದಳಿ ಬಾಳೆಹಣ್ಣು","ಪಚ್ಚೆ ಬಾಳೆಹಣ್ಣು","ಕೋಳಿ ಮೊಟ್ಟೆ","ಮೊಟ್ಟೆ",
  "ಸೀಮೆಬದನೆ","ಪಾಲಕ್ ಸೊಪ್ಪು","ನುಗ್ಗೆ","ಕರಿಬೇವು","ಮುಳ್ಳುಸೌತೆ","ಈರುಳ್ಳಿ","ಪಡುವಲಕಾಯಿ"
];

function CreditBill() {

  const initialRows = itemList.map((item) => ({
    item,
    quantity: "",
    rate: "",
    amount: ""
  }));

  const [billNo, setBillNo] = useState("");
  const [date, setDate] = useState("");
  const [customer, setCustomer] = useState("");
  const [rows, setRows] = useState(initialRows);

  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;

    if (field === "quantity" || field === "rate") {
      const qty = parseFloat(updatedRows[index].quantity) || 0;
      const rate = parseFloat(updatedRows[index].rate) || 0;
      updatedRows[index].amount = qty * rate;
    }

    setRows(updatedRows);
  };

  const totalAmount = rows.reduce(
    (sum, row) => sum + (parseFloat(row.amount) || 0),
    0
  );

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setBillNo("");
    setDate("");
    setCustomer("");
    setRows(initialRows);
  };

  return (
    <div className="bill-container">

      {/* HEADER */}
      <div className="header-container">
        <div className="header-left"></div>

        <div className="header-center">
          <h1>CREDIT BILL</h1>
          <h2>D.K. & Udupi Dist. HOPCOMS</h2>
          <p>(Under Dept. of Horticulture)</p>
          <p>
            Karangalpady Market, Mangaluru - 3  
            &nbsp; Email: dkuhopcoms@yahoo.com
          </p>
          <p><b>GSTIN: 29AAFAS6904H1Z8</b></p>
        </div>

        <div className="header-right">
          <p><b>Ph.: 0824-2495008</b></p>
          <p>2275008</p>
        </div>
      </div>

      <hr />

      {/* Bill Info */}
      <div className="bill-info-row">
        <div className="inline-field">
          <span className="field-label">No.</span>
          <input
            type="text"
            value={billNo}
            onChange={(e) => setBillNo(e.target.value)}
            className="straight-box"
          />
        </div>

        <div className="inline-field">
          <span className="field-label">Date:</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="straight-box"
          />
        </div>
      </div>

      {/* To */}
      <div className="to-section">
        <span className="field-label">To:</span>
        <input
          type="text"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
          className="straight-box to-box"
        />
      </div>

      {/* TABLE */}
      <table>
        <thead>
          <tr>
            <th>Sl. No.</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{row.item}</td>
              <td>
                <input
                  type="number"
                  value={row.quantity}
                  onChange={(e) =>
                    handleChange(index, "quantity", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.rate}
                  onChange={(e) =>
                    handleChange(index, "rate", e.target.value)
                  }
                />
              </td>
              <td>{row.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* TOTAL */}
      <div className="bottom-total">
        Total Amount: ₹ {totalAmount}
      </div>

      {/* SIGNATURES */}
      <div className="signature-section">
        <div className="signature-left">ಪಡಕೊಂಡವರ ಸಹಿ</div>
        <div className="signature-right">ಸರಬರಾಜುದಾರರ ಸಹಿ</div>
      </div>

      {/* BUTTONS */}
      <div className="button-row no-print">
        <button className="reset-btn" onClick={handleReset}>
          🔄 Reset
        </button>

        <button className="print-btn" onClick={handlePrint}>
          🖨 Print
        </button>
      </div>

    </div>
  );
}

export default CreditBill;