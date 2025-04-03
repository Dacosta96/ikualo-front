import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import IncomeExpenseLineChart from "../../components/charts/financial/IncomeExpenseLineChart";
import MonthlyBalanceChart from "../../components/charts/financial/MonthlyBalanceChart";
import IncomeExpensePieChart from "../../components/charts/financial/IncomeExpensePieChart";
import FinancialSummary from "../../components/charts/financial/FinancialSummary";
import { getMovementsByEmail } from "../../api/movementAction";
import { getUserByEmail } from "../../api/usersAction";
import { useBalance } from "../../context/BalanceContext";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

export default function FinancialReports() {
  const { user } = useUser();
  const { setBalance } = useBalance();
  const [transactions, setTransactions] = useState<any[]>([]);
  const fetchMovementsData = async () => {
    try {
      const movements = await getMovementsByEmail(
        user?.primaryEmailAddress?.emailAddress || ""
      );
      const userData = await getUserByEmail(
        user?.primaryEmailAddress?.emailAddress || ""
      );
      setBalance(userData?.capital || 0);
      setTransactions(movements);
    } catch (error) {
      console.error("Error obteniendo datos:", error);
    }
  };

  useEffect(() => {
    fetchMovementsData();
  }, []);
  return (
    <>
      <PageMeta
        title="Financial Reports | Ikualo"
        description="Financial reports and analytics dashboard"
      />
      <PageBreadcrumb pageTitle="Reportes" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ComponentCard title="Tendencia de ingresos vs gastos">
          <IncomeExpenseLineChart data={transactions} />
        </ComponentCard>
        <ComponentCard title="Saldo Diario">
          <MonthlyBalanceChart data={transactions} />
        </ComponentCard>
        <ComponentCard title="Distribución de ingresos vs gastos">
          <IncomeExpensePieChart data={transactions} />
        </ComponentCard>
        <ComponentCard title="Resumen financiero">
          <FinancialSummary data={transactions} />
        </ComponentCard>
      </div>
    </>
  );
}
