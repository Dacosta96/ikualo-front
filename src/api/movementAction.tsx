import axiosInstance from "./api";
import { movementDTO } from "./dto/movements-dto";

export const createMovement = async (
  datamovement: movementDTO
): Promise<any> => {
  try {
    const response = await axiosInstance.post(`movements`, datamovement);

    if (response.status !== 201) {
      return null;
    }
    return response.data;
  } catch (error) {
    console.error("Error creating datamovement", error);
  }
  return null;
};
