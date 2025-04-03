import { useEffect, useState } from "react";
import { FiArrowDownCircle, FiArrowUpCircle } from "react-icons/fi";
//import axiosInstance from "../../api/api";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import PageMeta from "../../components/common/PageMeta";
import Flatpickr from "react-flatpickr";
import { NumericFormat } from "react-number-format";
import { createMovement, getMovementsByEmail } from "../../api/movementAction";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserByEmail } from "../../api/usersAction";
import { useBalance } from "../../context/BalanceContext";

interface Transaction {
  type: "income" | "expense";
  amount: number;
  description: string;
  date: string;
}

export default function Home() {
  const { user } = useUser();
  const { setBalance } = useBalance();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [formData, setFormData] = useState<Transaction>({
    type: "income",
    amount: 0,
    description: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [loading, setLoading] = useState(false);

  //console.log("axiosInstance", axiosInstance.get(""));

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
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { name: string; value: string }
  ) => {
    const { name, value } = "target" in e ? e.target : e;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) : value,
    }));
  };

  const handleDateChange = (date: Date[]) => {
    setFormData((prev) => ({
      ...prev,
      date: date[0].toISOString().split("T")[0], // Format the date correctly
    }));
  };

  const handleTypeSelection = (type: "income" | "expense") => {
    setFormData((prev) => ({
      ...prev,
      type,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await createMovement({
        emailUser: user?.primaryEmailAddress?.emailAddress || "",
        amount: formData.amount,
        type: formData.type,
        date: formData.date,
        description: formData.description,
      });
      if (response) {
        fetchMovementsData();
        console.log("Movimiento creado:", response);
        toast.success("Movimiento registrado correctamente");
      }
      setFormData({
        type: "income",
        amount: 0,
        description: "",
        date: new Date().toISOString().split("T")[0],
      });
    } catch (error) {
      fetchMovementsData();
      console.error("Error creating datamovement", error);
      toast.error("Error al registrar el movimiento");
      setLoading(false);
    }
    setTransactions([...transactions, formData]);
    setFormData({
      type: "income",
      amount: 0,
      description: "",
      date: new Date().toISOString().split("T")[0],
    });
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <PageMeta
        title="Registro Financiero"
        description="Registra ingresos y egresos"
      />
      <h1 className="text-2xl font-bold mb-4">Registro Financiero</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-lg shadow"
      >
        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={() => handleTypeSelection("income")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg w-1/2 text-white transition ${
              formData.type === "income"
                ? "bg-green-500 shadow-md"
                : "bg-gray-300 hover:bg-green-400"
            }`}
          >
            <FiArrowDownCircle className="text-2xl" />
            Ingreso
          </button>

          <button
            type="button"
            onClick={() => handleTypeSelection("expense")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg w-1/2 text-white transition ${
              formData.type === "expense"
                ? "bg-red-500 shadow-md"
                : "bg-gray-300 hover:bg-red-400"
            }`}
          >
            <FiArrowUpCircle className="text-2xl" />
            Egreso
          </button>
        </div>

        <div>
          <Label htmlFor="amount">Monto</Label>
          <NumericFormat
            id="amount"
            name="amount"
            value={formData.amount}
            onValueChange={(values) =>
              handleChange({ name: "amount", value: values.value || "0" })
            }
            thousandSeparator="."
            decimalSeparator=","
            prefix="$ "
            allowNegative={false}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <Label htmlFor="datePicker">Fecha</Label>
          <Flatpickr
            value={formData.date}
            onChange={handleDateChange}
            options={{ dateFormat: "Y-m-d" }}
            className="h-11 w-full rounded-lg border px-4 py-2.5 text-sm"
            placeholder="Selecciona una fecha"
          />
        </div>

        <div>
          <Label htmlFor="description">Descripción</Label>
          <Input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className={`text-white px-4 py-2 rounded transition focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
              loading ||
              isNaN(Number(formData.amount)) ||
              Number(formData.amount) === 0
                ? "bg-gray-400 cursor-not-allowed focus:ring-gray-500"
                : "bg-[#3b4881] hover:bg-[#2f3b6d] focus:ring-[#3b4881]"
            }`}
            disabled={
              loading ||
              isNaN(Number(formData.amount)) ||
              Number(formData.amount) === 0
            }
          >
            {loading ? "Procesando..." : "Guardar Movimiento"}
          </button>
        </div>
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
                className={`flex flex-wrap items-center p-2 rounded ${
                  tx.type === "income" ? "bg-green-100" : "bg-red-100"
                }`}
              >
                {/* Ícono */}
                <span className="text-2xl mr-2">
                  {tx.type === "income" ? (
                    <FiArrowDownCircle className="text-green-600" />
                  ) : (
                    <FiArrowUpCircle className="text-red-600" />
                  )}
                </span>

                {/* Información del movimiento */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 w-full text-sm md:text-base">
                  <strong>
                    {tx.type === "income" ? "Ingreso" : "Egreso"}:
                  </strong>
                  <span>${tx.amount.toFixed(2)}</span>
                  <span>{tx.description}</span>
                  <span className="text-gray-500">
                    {new Date(tx.date).toLocaleDateString("es-ES")}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
