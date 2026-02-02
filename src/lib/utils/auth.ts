import { AxiosError } from "axios";

interface ApiErrorResponse {
  message?: string;
  errors?: Record<string, string[]>;
}

/**
 * Extract a user-friendly error message from an API error response
 */
export const getErrorMessage = (error: unknown): string => {
  const axiosError = error as AxiosError<ApiErrorResponse>;

  // Check for API message first
  if (axiosError.response?.data?.message) {
    return axiosError.response.data.message;
  }

  // Check for validation errors
  if (axiosError.response?.data?.errors) {
    const firstError = Object.values(axiosError.response.data.errors)[0];
    if (firstError && firstError.length > 0) {
      return firstError[0];
    }
  }

  // Fall back to axios error message
  if (axiosError.message) {
    return axiosError.message;
  }

  return "An unexpected error occurred";
};
