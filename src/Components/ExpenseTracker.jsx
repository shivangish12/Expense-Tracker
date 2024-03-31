import React from "react";
import Card from "./Card";
import styles from "./ExpenseTracker.module.css";
import PieChartComponent from "./PieChartComponent";
import { useState } from "react";
import BarGraphComponent from "./BarGraphComponent";

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncome] = useState([{ amount: 5000 }]);

  const addIncome = (income) => {
    setIncome([...incomes, income]);
  };

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
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

  const totalExpenses = Object.values(calculateSummary()).reduce(
    (acc, cur) => acc + cur,
    0
  );

  const categoryColors = {
    Food: "#A000FF",
    Entertainment: "#FF9304",
    Travel: "#FDE006",
  };

  const totalIncome = incomes.reduce(
    (acc, income) => acc + parseFloat(income.amount),
    0
  );

  const barGraphData = Object.entries(calculateSummary()).map(
    ([category, value]) => ({
      category: category,
      value: value,
    })
  );

  return (
    <div>
      <div className={styles.tracker}>
        <Card
          heading="Wallet Balance"
          figure={totalIncome}
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
        />
        <PieChartComponent data={calculateSummary()} colors={categoryColors} />
      </div>
      <div>
        <BarGraphComponent data={barGraphData} fillColor="#8784D2" />
      </div>
    </div>
  );
};

export default ExpenseTracker;
