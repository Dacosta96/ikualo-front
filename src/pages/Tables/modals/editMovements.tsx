import Modal from "react-modal";
import { NumericFormat } from "react-number-format";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import { FiX } from "react-icons/fi";

interface EditMovementModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: {
    amount: string;
    date: string;
    description: string;
  };
  handleChange: (data: { name: string; value: string }) => void;
  handleDateChange: (date: Date[]) => void;
  handleSubmit: (event: React.FormEvent) => void;
}

const EditMovementModal: React.FC<EditMovementModalProps> = ({
  isOpen,
  onClose,
  formData,
  handleChange,
  handleDateChange,
  handleSubmit,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={modalStyle}
      ariaHideApp={false}
    >
      <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Editar Movimiento</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Monto
            </label>
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
              className="w-full p-3 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="datePicker"
              className="block text-sm font-medium text-gray-700"
            >
              Fecha
            </label>
            <Flatpickr
              value={formData.date}
              onChange={handleDateChange}
              options={{ dateFormat: "Y-m-d" }}
              className="h-11 w-full rounded-lg border px-4 py-2.5 text-sm"
              placeholder="Selecciona una fecha"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Descripción
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={(e) =>
                handleChange({ name: "description", value: e.target.value })
              }
              className="w-full p-3 border rounded"
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditMovementModal;

// Estilos del modal
const modalStyle = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    border: "none",
    borderRadius: "12px",
    width: "90vw",
    maxWidth: "500px",
    maxHeight: "90vh",
  },
};
