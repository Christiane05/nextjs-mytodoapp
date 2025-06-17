"use client"

import PieChart from "../../horizon-tailwind-react/src/components/charts/PieChart"; 
import {pieChartData, pieChartOptions} from "../../horizon-tailwind-react/src/variables/charts";

 
export default function Chart() {
  return (
    <PieChart
      series={pieChartData}
      options={pieChartOptions}
    />
  );
}