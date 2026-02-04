import { axios } from "../axios";

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  phone: string | null;
  phone_country: string | null;
  phone_normalized: string | null;
  phone_national: string | null;
  phone_e164: string | null;
  phone_verified_at: string | null;
  language: string;
  created_at: string;
  updated_at: string;
  city_id: number | null;
  created_by: string;
  country_id: number | null;
  deleted_at: string | null;
  is_active: number;
  tenant_id: number | null;
  blocked_until: string | null;
  gender: string | null;
  birthday: string | null;
  unread_notifications_count: number;
  image: string | null;
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
  reset_token?: string;
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
export const getCurrentUser = async (): Promise<User> => {
  const { data } = await axios.post<User>("/user/user");
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

/**
 * Social Login Request Interface
 */
export interface SocialLoginRequest {
  provider: string;
  access_token: string;
}

/**
 * Social Login
 * POST /user/social
 */
export const socialLogin = async (
  payload: SocialLoginRequest,
): Promise<AuthResponse> => {
  const { data } = await axios.post<AuthResponse>("/user/social", payload);
  return data;
};
