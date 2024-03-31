import React from "react";
import { useState } from "react";
import Balance from "./Balance";
import Expenses from "./Expenses";
import styles from "./Card.module.css";

const Card = ({
  heading,
  figure,
  name,
  modalType,
  buttonColor,
  figureColor,
  addExpense,
  addIncome,
  editExpense, // Make sure to receive the editExpense prop
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.card}>
      <h4>
        <span className={styles.head}>{heading}:</span>{" "}
        <span className={styles.amount} style={{ color: figureColor }}>
          ₹{figure}
        </span>
      </h4>
      <button
        className={`${styles.button}`}
        style={{
          background: `linear-gradient(90deg, ${buttonColor.join(", ")})`,
        }}
        onClick={openModal}
      >
        {name}
      </button>
      {modalType === "balance" && (
        <Balance
          isOpen={isModalOpen}
          closeModal={closeModal}
          addIncome={addIncome}
        />
      )}
      {modalType === "expense" && (
        <Expenses
          isOpen={isModalOpen}
          closeModal={closeModal}
          addExpense={addExpense}
          editExpense={editExpense} // Pass the editExpense prop to Expenses component
        />
      )}
    </div>
  );
};

export default Card;
