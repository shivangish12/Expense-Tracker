import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import styles from "./Expenses.module.css";

const Expenses = ({
  isOpen,
  closeModal,
  addExpense,
  initialData,
  editExpense,
}) => {
  const [expenseData, setExpenseData] = useState({
    title: "",
    price: "",
    category: "",
    date: "",
  });

  // Update the expenseData when initialData changes
  useEffect(() => {
    if (initialData) {
      setExpenseData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseData({ ...expenseData, [name]: value });
  };

  const handleSubmit = () => {
    // Ensure all fields are filled
    if (
      expenseData.title &&
      expenseData.price &&
      expenseData.category &&
      expenseData.date
    ) {
      // Call addExpense function with the expense data
      if (initialData) {
        // If initialData exists, it means we're editing
        editExpense(expenseData); // Call editExpense instead of addExpense
      } else {
        addExpense(expenseData);
      }
      // Close the modal
      closeModal();
    } else {
      alert("Please fill in all fields");
    }
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
      <h2>{initialData ? "Edit Expense" : "Add Expense"}</h2>
      <div className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder="Title"
          name="title"
          value={expenseData.title}
          onChange={handleChange}
        />
        <input
          className={styles.input}
          type="number"
          placeholder="Price"
          name="price"
          value={expenseData.price}
          onChange={handleChange}
        />
        <select
          className={styles.input}
          name="category"
          value={expenseData.category}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select category
          </option>
          <option value="Food">Food</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Travel">Travel</option>
        </select>
        <input
          className={styles.input}
          type="date"
          name="date"
          value={expenseData.date}
          onChange={handleChange}
        />
        <button className={styles.expenseButton} onClick={handleSubmit}>
          {initialData ? "Update Expense" : "Add Expense"}
        </button>
        <button className={styles.cancelButton} onClick={closeModal}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default Expenses;
