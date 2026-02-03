import { axios } from "@/lib/axios";

export interface ChangePasswordPayload {
  current_password: string;
  password: string;
  password_confirmation: string;
}

export interface ChangePasswordResponse {
  message: string;
}

export const changePassword = async (payload: ChangePasswordPayload) => {
  const response = await axios.post<ChangePasswordResponse>(
    "/user/change_password",
    payload
  );
  return response.data;
};
