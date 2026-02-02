import { axios } from "../axios";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  // Add other user fields as needed
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone?: string;
  phone_country?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message?: string;
}

/**
 * Login user
 * POST /user/login
 */
export const login = async (
  credentials: LoginCredentials,
): Promise<AuthResponse> => {
  const { data } = await axios.post<AuthResponse>("/user/login", credentials);
  return data;
};

/**
 * Register new user
 * POST /user/signup
 */
export const register = async (
  registerData: RegisterData,
): Promise<AuthResponse> => {
  const { data } = await axios.post<AuthResponse>("/user/signup", registerData);
  return data;
};

/**
 * Logout user
 * POST /user/logout
 */
export const logout = async (): Promise<void> => {
  await axios.post("/user/logout");
};

/**
 * Get current user data
 * POST /user/user
 */
export const getCurrentUser = async (): Promise<{ user: User }> => {
  const { data } = await axios.post<{ user: User }>("/user/user");
  return data;
};

/**
 * Request password reset
 * POST /user/forgot
 */
export const forgotPassword = async (email: string): Promise<void> => {
  await axios.post("/user/forgot", {
    email,
    reset_type: "mail_otp",
  });
};

/**
 * Reset password
 * POST /user/change_password
 */
export const resetPassword = async (data: {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
}): Promise<void> => {
  await axios.post("/user/change_password", {
    email: data.email,
    reset_token: data.token,
    password: data.password,
    password_confirmation: data.password_confirmation,
  });
};

/**
 * Verify OTP
 * POST /user/verify
 */
export const verifyOtp = async (data: {
  email: string;
  otp: string;
}): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>("/user/verify", {
    email: data.email,
    code: data.otp,
    type: "reset",
  });
  return response.data;
};

/**
 * Resend OTP
 * POST /user/resend
 */
export const resendOtp = async (email: string): Promise<void> => {
  await axios.post("/user/resend", {
    email,
    type: "reset",
  });
};
