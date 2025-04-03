import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
//import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteMovement, getMovementsByEmail } from "../../api/movementAction";
import { useUser } from "@clerk/clerk-react";
import { IconButton } from "@mui/material";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import EditMovementModal from "./modals/editMovements";
import DeleteMovementModal from "./modals/deleteMovement";
import { toast } from "react-toastify";

const OrdersAdmin: React.FC = () => {
  const { user } = useUser();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 0,
    pageSize: 10,
  });
  const [formData, setFormData] = useState({
    amount: "",
    date: "",
    description: "",
  });
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<any>(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const handleEdit = async (e: React.MouseEvent, row: any) => {
    e.preventDefault();
    console.log("row", row);
    console.log("formData", formData);
    setOpenEditModal(true);
  };

  const handleDelete = async (row: any) => {
    console.log("row", row);
    setRowToDelete(row); // Guarda el movimiento a eliminar
    setOpenDeleteModal(true);
  };

  const fetchMovementsData = async () => {
    try {
      const movements = await getMovementsByEmail(
        user?.primaryEmailAddress?.emailAddress || ""
      );

      // Asegurar que cada objeto tenga una propiedad `id`
      const formattedMovements = movements.map((item: any) => ({
        ...item,
        id: item._id, // Asigna `_id` como `id`
      }));

      setTransactions(formattedMovements);

      setPagination((prev) => ({
        ...prev,
        total: movements.length,
      }));
    } catch (error) {
      console.error("Error obteniendo datos:", error);
    }
  };

  useEffect(() => {
    fetchMovementsData();
  }, []);
  // Definición de columnas del DataGrid
  const columns: GridColDef[] = [
    { field: "type", headerName: "Tipo", width: 100 },
    { field: "description", headerName: "Descripción", flex: 1 },
    { field: "amount", headerName: "Monto", flex: 1 },
    { field: "date", headerName: "Fecha", flex: 1 },
    {
      field: "actions",
      headerName: "Acciones",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={(e) => handleEdit(e, params.row)}
          >
            <FiEdit size={20} />
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.row)}>
            <FiTrash2 size={20} />
          </IconButton>
        </>
      ),
    },
  ];

  const handleChange = ({ name, value }: { name: string; value: string }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (selectedDates: { toISOString: () => string }[]) => {
    const date = selectedDates[0]?.toISOString().split("T")[0]; // Formato YYYY-MM-DD
    setFormData((prev) => ({
      ...prev,
      date: date || "",
    }));
  };

  const confirmDelete = async () => {
    if (!rowToDelete) return;
    setIsLoadingDelete(true);
    try {
      const response = await deleteMovement(rowToDelete._id);
      console.log("Movimiento eliminado:", response);
      if (response) {
        toast.success("Movimiento eliminado correctamente");
        setIsLoadingDelete(false);
      }
      fetchMovementsData();
      setOpenDeleteModal(false);
      setRowToDelete(null);

      // TODO: Actualizar la lista de movimientos en la UI si es necesario
    } catch (error) {
      toast.error("Error al eliminar el movimiento");
      setIsLoadingDelete(false);
      console.error("Error eliminando el movimiento", error);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 100px)", // Mantiene altura general
      }}
    >
      <h2 className="text-lg font-semibold mb-4">Historial de movimientos</h2>

      <div style={{ flexGrow: 1 }}>
        <DataGrid
          slots={{ toolbar: GridToolbar }}
          rows={transactions}
          columns={columns}
          pageSizeOptions={[10, 20, 50, 100]}
          paginationModel={{
            page: pagination.page,
            pageSize: pagination.pageSize,
          }}
          onPaginationModelChange={(newPagination) =>
            setPagination((prev) => ({
              ...prev,
              page: newPagination.page,
              pageSize: newPagination.pageSize,
            }))
          }
          rowCount={pagination.total}
          paginationMode="client"
          autoHeight // Permite que la tabla solo ocupe el espacio necesario
          sx={{
            "& .MuiDataGrid-root": { overflowX: "auto" },
            minHeight: "200px", // Asegura que haya una altura mínima cuando hay pocas filas
            maxHeight: "calc(100vh - 200px)", // Evita que ocupe toda la pantalla en exceso
          }}
        />
      </div>

      {/* Modales */}
      <EditMovementModal
        isOpen={openEditModal}
        onClose={() => setOpenEditModal(false)}
        formData={formData}
        handleChange={handleChange}
        handleDateChange={handleDateChange}
        handleSubmit={(event) => {
          event.preventDefault();
          setOpenEditModal(false);
          console.log("formData", formData);
        }}
      />

      <DeleteMovementModal
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={() => confirmDelete()}
        isLoading={isLoadingDelete}
      />
    </div>
  );
};

export default OrdersAdmin;
