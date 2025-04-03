import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";

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

export default function FinancialSummary({ data = [] }: Props) {
  const totalIncome = data
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpenses = data
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const netBalance = totalIncome - totalExpenses;
  const savingsRate =
    totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Income</p>
            <p className="mt-2 text-2xl font-semibold text-green-600">
              {formatCurrency(totalIncome)}
            </p>
          </div>
          <div className="rounded-full bg-green-100 p-3">
            <ArrowUpIcon className="h-6 w-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Expenses</p>
            <p className="mt-2 text-2xl font-semibold text-red-600">
              {formatCurrency(totalExpenses)}
            </p>
          </div>
          <div className="rounded-full bg-red-100 p-3">
            <ArrowDownIcon className="h-6 w-6 text-red-600" />
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Net Balance</p>
            <p
              className={`mt-2 text-2xl font-semibold ${
                netBalance >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {formatCurrency(netBalance)}
            </p>
          </div>
          <div
            className={`rounded-full p-3 ${
              netBalance >= 0 ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {netBalance >= 0 ? (
              <ArrowUpIcon className="h-6 w-6 text-green-600" />
            ) : (
              <ArrowDownIcon className="h-6 w-6 text-red-600" />
            )}
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Savings Rate</p>
            <p
              className={`mt-2 text-2xl font-semibold ${
                savingsRate >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {savingsRate.toFixed(1)}%
            </p>
          </div>
          <div
            className={`rounded-full p-3 ${
              savingsRate >= 0 ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {savingsRate >= 0 ? (
              <ArrowUpIcon className="h-6 w-6 text-green-600" />
            ) : (
              <ArrowDownIcon className="h-6 w-6 text-red-600" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
