import React, { useState, useEffect } from "react";
import Card from "./Card";
import styles from "./ExpenseTracker.module.css";
import PieChartComponent from "./PieChartComponent";
import BarGraphComponent from "./BarGraphComponent";
import RecentTransactions from "./RecentTransactions";

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([{ amount: 5000 }]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncome, setTotalIncome] = useState(5000);

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses"));
    const storedIncomes = JSON.parse(localStorage.getItem("incomes"));
    const storedRecentTransactions = JSON.parse(
      localStorage.getItem("recentTransactions")
    );
    const storedTotalExpenses =
      parseFloat(localStorage.getItem("totalExpenses")) || 0;
    const storedTotalIncome =
      parseFloat(localStorage.getItem("totalIncome")) || 0;

    if (storedExpenses) setExpenses(storedExpenses);
    if (storedIncomes) setIncomes(storedIncomes);
    if (storedRecentTransactions)
      setRecentTransactions(storedRecentTransactions);
    if (storedTotalExpenses) setTotalExpenses(storedTotalExpenses);
    if (storedTotalIncome) setTotalIncome(storedTotalIncome);
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("incomes", JSON.stringify(incomes));
    localStorage.setItem(
      "recentTransactions",
      JSON.stringify(recentTransactions)
    );
    localStorage.setItem("totalExpenses", totalExpenses);
    localStorage.setItem("totalIncome", totalIncome);
  }, [expenses, incomes, recentTransactions, totalExpenses, totalIncome]);

  const addIncome = (income) => {
    setIncomes([...incomes, income]);
    setTotalIncome(
      (prevTotalIncome) => prevTotalIncome + parseFloat(income.amount)
    );
  };

  const addExpense = (expense) => {
    const expenseAmount = parseFloat(expense.price);
    const remainingBalance = totalIncome - totalExpenses;

    if (expenseAmount > remainingBalance) {
      alert("You cannot spend more than your available wallet balance!");
      return;
    }

    const updatedRecentTransactions = [...recentTransactions, expense];
    setRecentTransactions(updatedRecentTransactions);

    // Update local storage with the updated recent transactions
    localStorage.setItem(
      "recentTransactions",
      JSON.stringify(updatedRecentTransactions)
    );

    setExpenses([...expenses, expense]);
    setTotalExpenses((prevTotalExpenses) => prevTotalExpenses + expenseAmount);
  };

  const calculateSummary = () => {
    const summary = {
      Food: 1,
      Travel: 1,
      Entertainment: 1,
    };

    expenses.forEach((expense) => {
      summary[expense.category] += parseFloat(expense.price);
    });

    return summary;
  };

  const categoryColors = {
    Food: "#A000FF",
    Entertainment: "#FF9304",
    Travel: "#FDE006",
  };

  const barGraphData = Object.entries(calculateSummary()).map(
    ([category, value]) => ({
      category: category,
      value: value,
    })
  );

  const deleteTransaction = (index) => {
    const deletedTransaction = recentTransactions[index];
    const deletedAmount = parseFloat(deletedTransaction.price);

    const updatedTransactions = recentTransactions.filter(
      (_, idx) => idx !== index
    );
    setRecentTransactions(updatedTransactions);

    const updatedExpenses = expenses.filter((_, idx) => idx !== index);
    setExpenses(updatedExpenses);

    const updatedTotalExpenses = totalExpenses - deletedAmount;
    setTotalExpenses(updatedTotalExpenses);

    const updatedTotalIncome = totalIncome + deletedAmount;
    setTotalIncome(updatedTotalIncome);
  };

  const editExpense = (index, updatedExpense) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index] = updatedExpense;
    setExpenses(updatedExpenses);
  };

  const walletBalance = totalIncome - totalExpenses;

  return (
    <div className={styles.total}>
      <div className={styles.tracker}>
        <Card
          heading="Wallet Balance"
          figure={walletBalance}
          name="+ Add Income"
          modalType="balance"
          figureColor={"#89E148"}
          buttonColor={["#B5DC52", "#89E148"]}
          addIncome={addIncome}
        />
        <Card
          heading="Expenses"
          figure={totalExpenses}
          name="+ Add Expenses"
          modalType="expense"
          figureColor={"#F4BB4A"}
          buttonColor={["#FF9595", "#FF4747", "#FF3838"]}
          addExpense={addExpense}
          editExpense={editExpense}
        />
        <PieChartComponent data={calculateSummary()} colors={categoryColors} />
      </div>

      <div className={styles.bottom}>
        <div className={styles.transaction}>
          <RecentTransactions
            transactions={recentTransactions}
            deleteTransaction={deleteTransaction}
            editExpense={editExpense}
          />
        </div>
        <div className={styles.bar}>
          <BarGraphComponent data={barGraphData} fillColor="#8784D2" />
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
