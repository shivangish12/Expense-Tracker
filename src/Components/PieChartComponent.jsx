import React from "react";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";

const PieChartComponent = ({ data, colors }) => {
  const categoryNames = Object.keys(data);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={categoryNames.map((category) => ({
            name: category,
            value: data[category],
          }))}
          cx={200}
          cy={200}
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {categoryNames.map((category, index) => (
            <Cell key={category} fill={colors[category]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <Legend
        layout="horizontal"
        align="center"
        verticalAlign="bottom"
        wrapperStyle={{ margin: "10px" }}
      />
    </div>
  );
};

export default PieChartComponent;
