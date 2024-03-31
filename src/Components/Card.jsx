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
  totalExpenses,
  addIncome,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);
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
        />
      )}
    </div>
  );
};

export default Card;
