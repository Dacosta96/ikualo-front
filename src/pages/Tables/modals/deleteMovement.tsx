import Modal from "react-modal";
import { FiX } from "react-icons/fi";

interface DeleteMovementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (event: React.FormEvent) => void;
  isLoading: boolean;
}

const DeleteMovementModal: React.FC<DeleteMovementModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={modalStyle}
      ariaHideApp={false}
    >
      <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-md mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">¿Eliminar Movimiento?</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <FiX size={24} />
          </button>
        </div>

        <p className="text-gray-700 mb-6">
          ¿Estás seguro de que deseas eliminar este movimiento? Esta acción no
          se puede deshacer.
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border rounded"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded"
            disabled={isLoading}
          >
            {isLoading ? "Pendiente..." : "Eliminar"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteMovementModal;

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
    maxWidth: "400px",
    maxHeight: "90vh",
  },
};
