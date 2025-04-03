import axiosInstance from "./api";
import { UserDTO } from "./dto/user-dto";

export const createUser = async (dataUser: UserDTO): Promise<any> => {
  try {
    const response = await axiosInstance.post(
      `users/create-with-clerk`,
      dataUser
    );

    if (response.status !== 201) {
      return null;
    }
    return response.data;
  } catch (error) {
    console.error("Error creating user", error);
  }
  return null;
};

export const getUserByEmail = async (email: string): Promise<any> => {
  try {
    console.log("Getting user by email", email);
    const response = await axiosInstance.get(`users/by-email`, {
      params: { email },
    });

    console.log("response", response);
    if (response.status !== 200) {
      console.error("Error getting user by email");
      return { user: [] };
    }
    return response.data;
  } catch (error) {
    console.error("Error getting user by email", error);
    return { user: [] };
  }
};
