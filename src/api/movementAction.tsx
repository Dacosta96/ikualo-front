import axiosInstance from "./api";
import { EditMovementDTO, movementDTO } from "./dto/movements-dto";

export const createMovement = async (
  datamovement: movementDTO
): Promise<any> => {
  try {
    const response = await axiosInstance.post(`movements`, datamovement);
    console.log("response", response);
    if (response.status !== 201) {
      return null;
    }
    return response.data;
  } catch (error) {
    console.error("Error creating datamovement", error);
  }
  return null;
};

export const getMovementsByEmail = async (email: string): Promise<any> => {
  try {
    console.log("Getting user by email", email);
    const response = await axiosInstance.get(`movements/user/${email}`);

    console.log("response", response);
    if (response.status !== 200) {
      console.error("Error getting user by movements");
      return { movements: [] };
    }
    return response.data;
  } catch (error) {
    console.error("Error getting user by movements", error);
    return { movements: [] };
  }
};

export const updateMovement = async (
  datamovement: EditMovementDTO
): Promise<any> => {
  try {
    console.log("Updating movement", datamovement);
    const response = await axiosInstance.put(`movements`, datamovement);
    console.log("response", response);
    if (response.status !== 200) {
      return null;
    }
    return response.data;
  } catch (error) {
    console.error("Error updating movement", error);
  }
  return null;
};

export const deleteMovement = async (movementId: string): Promise<any> => {
  try {
    const response = await axiosInstance.delete(`movements/${movementId}`);
    console.log("response", response);
    if (response.status !== 200) {
      return null;
    }
    return response.data;
  } catch (error) {
    console.error("Error deleting movement", error);
  }
  return null;
};
