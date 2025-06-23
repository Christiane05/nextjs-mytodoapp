"use client"
//import Chart from "react-apexcharts";
import dynamic from "next/dynamic"
import { useState } from "react"

// Import dynamique pour éviter les erreurs SSR dans Next.js
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

const PieChart = (props) => {
  const { series, options } = props;

  return (
    <Chart
      options={options}
      type="pie"
      width="100%"
      height="100%"
      series={series}
    />
  );
};

export default PieChart;
