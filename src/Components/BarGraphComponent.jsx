import React, { useState, useEffect } from "react";
import { BarChart, Bar, YAxis, Tooltip } from "recharts";

const BarGraphComponent = ({ data, fillColor }) => {
  const [chartData, setChartData] = useState(data);

  useEffect(() => {
    setChartData(data);
  }, [data]);

  const graphContainerStyle = {
    backgroundColor: "#f5f5f5",
    padding: "20px",
    borderRadius: "8px",
    width: "450px",
  };

  return (
    <div style={graphContainerStyle}>
      <BarChart
        width={400}
        height={300}
        data={chartData}
        layout="vertical"
        margin={{ top: 20, right: 30, left: 50, bottom: 5 }}
      >
        <YAxis
          dataKey="category"
          type="category"
          tick={{ fill: "black" }}
          axisLine={false}
        />
        <Tooltip />
        <Bar dataKey="value" fill={fillColor}>
          {chartData.map((entry, index) => (
            <Bar key={`bar-${index}`} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
};

export default BarGraphComponent;
