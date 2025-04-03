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

export default function IncomeExpenseLineChart({ data = [] }: Props) {
  if (data.length === 0) return <p>No hay datos disponibles</p>;

  // Obtener la fecha mínima en los datos
  const minDate = new Date(
    Math.min(...data.map((item) => new Date(item.date).getTime()))
  ).getTime();

  const options: ApexOptions = {
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#10B981", "#EF4444"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "line",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: [2, 2],
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    markers: {
      size: 0,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 6,
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      x: {
        format: "dd MMM yyyy",
      },
    },
    xaxis: {
      type: "datetime",
      categories: data.map((item) => item.date),
      min: minDate, // Establece la fecha mínima en el eje X
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#6B7280"],
        },
        formatter: (value) => `$${value.toLocaleString()}`,
      },
    },
  };

  const series = [
    {
      name: "Income",
      data: data
        .filter((item) => item.type === "income")
        .map((item) => ({ x: new Date(item.date).getTime(), y: item.amount })),
    },
    {
      name: "Expenses",
      data: data
        .filter((item) => item.type === "expense")
        .map((item) => ({ x: new Date(item.date).getTime(), y: item.amount })),
    },
  ];

  return (
    <div className="max-w-full overflow-x-auto custom-scrollbar">
      <div id="incomeExpenseChart" className="min-w-[1000px]">
        <Chart options={options} series={series} type="area" height={310} />
      </div>
    </div>
  );
}
