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
  // Procesamos los datos para agrupar por mes
  const monthlyData = data.reduce((acc, item) => {
    const date = new Date(item.date);
    const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
    const amount = item.type === "income" ? item.amount : -item.amount;

    if (!acc[monthKey]) {
      acc[monthKey] = 0;
    }
    acc[monthKey] += amount;

    return acc;
  }, {} as Record<string, number>);

  const sortedMonthKeys = Object.keys(monthlyData).sort();

  const categories = sortedMonthKeys.map((monthKey) => {
    const [year, month] = monthKey.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);
    return date.toLocaleDateString("es-ES", {
      month: "short",
      year: "numeric",
    });
  });

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        borderRadius: 5,
      },
    },
    xaxis: {
      categories: categories,
      labels: {
        formatter: function (value) {
          return value;
        },
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => `$${Math.round(value).toLocaleString()}`,
      },
    },
    tooltip: {
      y: {
        formatter: (val: number) =>
          `$${val.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
      },
    },
    colors: ["#008FFB"],
    dataLabels: {
      enabled: false,
    },
  };

  const series = [
    {
      name: "Balance Mensual",
      data: sortedMonthKeys.map((monthKey) => monthlyData[monthKey]),
    },
  ];

  return (
    <div className="max-w-full overflow-x-auto">
      <div id="monthlyBalanceChart">
        <Chart options={options} series={series} type="bar" height={350} />
      </div>
    </div>
  );
}
