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

export default function MonthlyBalanceChart({ data = [] }: Props) {
  const options: ApexOptions = {
    colors: ["#3B82F6"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 180,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "39%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      type: "datetime",
      categories: data.map((item) => item.date),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    yaxis: {
      labels: {
        formatter: (value) => `$${value.toLocaleString()}`,
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val: number) => `$${val.toLocaleString()}`,
      },
    },
  };

  const series = [
    {
      name: "Balance",
      data: data.map((item) => {
        const amount = item.type === "income" ? item.amount : -item.amount;
        return amount;
      }),
    },
  ];

  return (
    <div className="max-w-full overflow-x-auto custom-scrollbar">
      <div id="monthlyBalanceChart" className="min-w-[1000px]">
        <Chart options={options} series={series} type="bar" height={180} />
      </div>
    </div>
  );
}
