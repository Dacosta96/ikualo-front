import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface Movement {
  _id: string;
  userId: string;
  type: string;
  amount: number;
  description: string;
  date: string;
  created_at: string;
  updated_at: string;
}

interface Props {
  data?: Movement[];
}

export default function IncomeExpensePieChart({ data = [] }: Props) {
  const totalIncome = data
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpenses = data
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const options: ApexOptions = {
    colors: ["#10B981", "#EF4444"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "donut",
      height: 350,
    },
    labels: ["Income", "Expenses"],
    legend: {
      position: "bottom",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "14px",
              fontWeight: 500,
            },
            value: {
              show: true,
              fontSize: "16px",
              fontWeight: 600,
              formatter: (val) => `$${Number(val).toLocaleString()}`,
            },
            total: {
              show: true,
              label: "Total",
              formatter: () =>
                `$${(totalIncome + totalExpenses).toLocaleString()}`,
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      y: {
        formatter: (val) => `$${val.toLocaleString()}`,
      },
    },
  };

  const series = [totalIncome, totalExpenses];

  return (
    <div className="max-w-full">
      <div id="incomeExpensePieChart">
        <Chart options={options} series={series} type="donut" height={350} />
      </div>
    </div>
  );
}
