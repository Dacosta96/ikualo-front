import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import IncomeExpenseLineChart from "../../components/charts/financial/IncomeExpenseLineChart";
import MonthlyBalanceChart from "../../components/charts/financial/MonthlyBalanceChart";
import IncomeExpensePieChart from "../../components/charts/financial/IncomeExpensePieChart";
import FinancialSummary from "../../components/charts/financial/FinancialSummary";

const sampleData = [
  {
    _id: "67eec2a7dcd5ac07e5fb0166",
    userId: "67eebec9dcd5ac07e5fb0097",
    type: "expense",
    amount: 89000,
    description: "Agua",
    date: "2025-04-03T00:00:00.000Z",
    created_at: "2025-04-03T17:17:27.350Z",
    updated_at: "2025-04-03T17:17:27.350Z",
  },
  {
    _id: "67eec29adcd5ac07e5fb015f",
    userId: "67eebec9dcd5ac07e5fb0097",
    type: "income",
    amount: 1400000,
    description: "Salario Alpina",
    date: "2025-04-03T00:00:00.000Z",
    created_at: "2025-04-03T17:17:14.502Z",
    updated_at: "2025-04-03T17:17:14.502Z",
  },
];

export default function FinancialReports() {
  return (
    <>
      <PageMeta
        title="Financial Reports | Ikualo"
        description="Financial reports and analytics dashboard"
      />
      <PageBreadcrumb pageTitle="Financial Reports" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ComponentCard title="Income vs Expenses Trend">
          <IncomeExpenseLineChart data={sampleData} />
        </ComponentCard>
        <ComponentCard title="Monthly Balance">
          <MonthlyBalanceChart data={sampleData} />
        </ComponentCard>
        <ComponentCard title="Income vs Expenses Distribution">
          <IncomeExpensePieChart data={sampleData} />
        </ComponentCard>
        <ComponentCard title="Financial Summary">
          <FinancialSummary data={sampleData} />
        </ComponentCard>
      </div>
    </>
  );
}
