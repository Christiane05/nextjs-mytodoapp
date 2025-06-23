"use client"

import PieChart from "../ui/piechart"; 
import {pieChartData, pieChartOptions} from "../../lib/variables/charts";

 
export default function Chart() {
  return (
    <PieChart
      series={pieChartData}
      options={pieChartOptions}
    />
  );
}