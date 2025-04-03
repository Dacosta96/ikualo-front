import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import axiosInstance from "../../api/api";

interface Transaction {
  type: "income" | "expense";
  amount: number;
  description: string;
  date: string;
}

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [formData, setFormData] = useState<Transaction>({
    type: "income",
    amount: 0,
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  console.log("formData", axiosInstance.get(""));

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTransactions([...transactions, formData]);
    setFormData({
      type: "income",
      amount: 0,
      description: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <PageMeta
        title="Registro Financiero"
        description="Registra ingresos y egresos"
      />
      <PageBreadcrumb pageTitle="Registro Financiero" />

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-lg shadow"
      >
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="income">Ingreso</option>
          <option value="expense">Egreso</option>
        </select>

        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Monto"
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descripción"
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Guardar Movimiento
        </button>
      </form>

      <div className="mt-6 bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-bold mb-4">Movimientos</h2>
        {transactions.length === 0 ? (
          <p>No hay movimientos registrados.</p>
        ) : (
          <ul className="space-y-2">
            {transactions.map((tx, index) => (
              <li
                key={index}
                className={`p-2 rounded ${
                  tx.type === "income" ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <strong>{tx.type === "income" ? "Ingreso" : "Egreso"}:</strong>{" "}
                ${tx.amount.toFixed(2)} - {tx.description} ({tx.date})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
