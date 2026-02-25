import React, { useState } from "react";

const itemList = [
  "ಟೊಮೊಟೋ","ಬಿನ್ಸ್","ಅಲಸಂಡೆ","ಹಸಿಮೆಣಸು","ಬದನೆಕಾಯಿ","ಹೀರೆಕಾಯಿ",
  "ಹೂಕೋಸು","ಎಲೆಕೋಸು","ಮೂಲಂಗಿ","ತೊಂಡೆಕಾಯಿ","ಬೆಂಡೆಕಾಯಿ",
  "ಆಲೂಗಡ್ಡೆ","ಕ್ಯಾರೆಟ್","ಬೂದು ಕುಂಬಳಕಾಯಿ","ಸೋರೆಕಾಯಿ","ತೆಂಗಿನಕಾಯಿ",
  "ಚೀನಿಕಾಯಿ","ಬೀಟ್ ರೂಟ್","ಗೆಡ್ಡೆಕೋಸು","ಶುಂಠಿ",
  "ಸುವರ್ಣಗೆಡ್ಡೆ","ಕೊತ್ತಂಬರಿ ಸೊಪ್ಪು","ಹರಿವೆ ಸೊಪ್ಪು","ಬಸಳೆ ಸೊಪ್ಪು","ಪಾಲಕ್ ಸೊಪ್ಪು",
  "ಕದಳಿ ಬಾಳೆಹಣ್ಣು","ಪಚ್ಚೆ ಬಾಳೆಹಣ್ಣು","ಕೋಳಿ ಮೊಟ್ಟೆ","ಸೀಮೆಬದನೆ","ನುಗ್ಗೆ",
  "ಕರಿಬೇವು","ಮುಳ್ಳುಸೌತೆ","ಈರುಳ್ಳಿ","ಪಡುವಲಕಾಯಿ","ಬೆಳ್ಳುಳ್ಳಿ"
];

function CreditBill() {

  const initialRows = itemList.map((item) => ({
    item,
    quantity: "",
    rate: "",
    amount: ""
  }));

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

  // RESET
  const handleReset = () => {
    setRows(initialRows);
    document.querySelectorAll(".manual-entry").forEach(el => {
      el.innerText = "";
    });
  };

  // SAVE AS PDF (opens print → choose Save as PDF)
  const handleSave = () => {
    window.print();
  };

  // PRINT
  const handlePrint = () => {
    window.print();
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
          
        </div>
      </div>

      <hr />

      {/* Bill Info */}
      <div className="bill-info-row">
        <div className="inline-field">
          <span className="field-label">No. :</span>
          <span className="manual-entry no-entry" contentEditable></span>
        </div>

        <div className="inline-field">
          <span className="field-label">Date :</span>
          <span className="manual-entry" contentEditable></span>
        </div>
      </div>

      <div className="to-section">
        <span className="field-label">To :</span>
        <span className="manual-entry to-entry" contentEditable></span>
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

      {/* BUTTONS (Order: Reset → Save → Print) */}
      <div className="button-row no-print">
        <button className="reset-btn" onClick={handleReset}>
          🔄 Reset
        </button>

        <button className="save-btn" onClick={handleSave}>
          💾 Save
        </button>

        <button className="print-btn" onClick={handlePrint}>
          🖨 Print
        </button>
      </div>

    </div>
  );
}

export default CreditBill;