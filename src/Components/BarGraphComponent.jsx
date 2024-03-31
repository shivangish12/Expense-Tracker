import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import styles from "./BarGraphComponent.module.css";

const BarGraphComponent = ({ data }) => {
  return (
    <div className={styles.bar}>
      <BarChart
        width={400}
        height={300}
        data={data}
        layout="vertical"
        margin={{ top: 40, left: 40 }}
      >
        <XAxis type="number" axisLine={false} display="none" />
        <YAxis dataKey="category" type="category" axisLine={false} />
        <Tooltip />
        <Bar dataKey="value" fill="#8784D2" barSize={20} />
      </BarChart>
    </div>
  );
};

export default BarGraphComponent;
