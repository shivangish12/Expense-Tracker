import React, { useState } from "react";
import Modal from "react-modal";
import styles from "./Balance.module.css";

const Balance = ({ isOpen, closeModal, addIncome }) => {
  const [incomeAmount, setIncomeAmount] = useState("");

  const handleAddBalance = () => {
    const amount = parseFloat(incomeAmount);
    if (!isNaN(amount)) {
      // Call addIncome with an income object
      addIncome({ amount }); // Pass the income amount as an object
      setIncomeAmount("");
      closeModal();
    } else {
      alert("Please enter a valid number for income amount.");
    }
  };

  const handleInputChange = (event) => {
    setIncomeAmount(event.target.value);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className={styles.modal}
      style={{
        overlay: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        content: {
          width: "50%",
          height: "50%",
          borderRadius: "10px",
        },
      }}
    >
      <h4>Add Balance</h4>
      <div className={styles.details}>
        <input
          className={styles.input}
          type="number"
          placeholder="Income Amount"
          value={incomeAmount}
          onChange={handleInputChange}
        ></input>
        <button className={styles.balanceButton} onClick={handleAddBalance}>
          Add Balance
        </button>
        <button className={styles.cancelButton} onClick={closeModal}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default Balance;
