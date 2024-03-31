import React, { useState } from "react";
import styles from "./RecentTransactions.module.css";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import Expenses from "./Expenses"; // Import the Expenses component

const RecentTransactions = ({
  transactions,
  deleteTransaction,
  editExpense,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    price: "",
    category: "",
    date: "",
  });

  const openEditModal = (index) => {
    setEditIndex(index);
    setEditData(transactions[index]);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditIndex(null);
    setEditData({
      title: "",
      price: "",
      category: "",
      date: "",
    });
  };

  const handleEditExpense = (editedExpense) => {
    // Ensure editIndex is not null before calling editExpense
    if (editIndex !== null) {
      editExpense(editIndex, editedExpense);
      closeEditModal();
    } else {
      console.error("editIndex is null");
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 3;

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className={styles.transaction}>
      {currentTransactions.map((transaction, index) => (
        <div key={index}>
          <div className={styles.details}>
            <div>
              <p className={styles.title}>{transaction.title}</p>
              <p className={styles.date}>{transaction.date}</p>
            </div>
            <div className={styles.right}>
              <p className={styles.price}>₹{transaction.price}</p>

              <AiOutlineDelete
                className={styles.deleteIcon}
                onClick={() => deleteTransaction(index)}
              />

              <AiOutlineEdit
                className={styles.editIcon}
                onClick={() => openEditModal(index)} // Open edit modal on click
              />
            </div>
          </div>

          {index !== currentTransactions.length - 1 && (
            <hr className={styles.line} />
          )}
        </div>
      ))}
      <Expenses
        isOpen={isEditModalOpen}
        closeModal={closeEditModal}
        addExpense={handleEditExpense}
        initialData={editData}
        editExpense={editExpense} // Pass initial data to edit
      />
      <div className={styles.pagination}>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`${styles.arrow} ${styles.leftArrow}`}
        >
          &lt;
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`${styles.arrow} ${styles.rightArrow}`}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default RecentTransactions;
