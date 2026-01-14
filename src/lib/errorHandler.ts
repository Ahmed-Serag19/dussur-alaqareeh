import { AxiosError } from "axios";

/**
 * Extracts error message from API response
 * Tries multiple common error response formats
 */
export const getApiErrorMessage = (error: unknown): string => {
  // Handle Axios errors
  if (error && typeof error === "object" && "response" in error) {
    const axiosError = error as AxiosError<{
      message?: string;
      error?: string;
      errors?: Record<string, string[]>;
      data?: {
        message?: string;
        error?: string;
      };
    }>;

    const responseData = axiosError.response?.data;

    // Try different error message formats
    if (responseData) {
      // Format 1: { message: "Error message" }
      if (responseData.message && typeof responseData.message === "string") {
        return responseData.message;
      }

      // Format 2: { error: "Error message" }
      if (responseData.error && typeof responseData.error === "string") {
        return responseData.error;
      }

      // Format 3: { data: { message: "Error message" } }
      if (
        responseData.data?.message &&
        typeof responseData.data.message === "string"
      ) {
        return responseData.data.message;
      }

      // Format 4: { errors: { field: ["error1", "error2"] } }
      if (responseData.errors && typeof responseData.errors === "object") {
        const errorMessages = Object.values(responseData.errors)
          .flat()
          .filter((msg): msg is string => typeof msg === "string");
        if (errorMessages.length > 0) {
          return errorMessages.join(", ");
        }
      }
    }

    // Handle HTTP status codes
    const status = axiosError.response?.status;
    if (status === 401) {
      return "Authentication required. Please log in again.";
    }
    if (status === 403) {
      return "Access denied. You don't have permission to perform this action.";
    }
    if (status === 404) {
      return "Resource not found.";
    }
    if (status === 422) {
      return "Validation failed. Please check your input.";
    }
    if (status === 500) {
      return "Server error. Please try again later.";
    }
    if (status && status >= 500) {
      return "Server error. Please try again later.";
    }
  }

  // Handle standard Error objects
  if (error instanceof Error) {
    return error.message;
  }

  // Fallback
  return "An unexpected error occurred. Please try again.";
};

/**
 * Gets field-specific errors from API response
 * Returns an object with field names as keys and error messages as values
 */
export const getFieldErrors = (
  error: unknown
): Record<string, string> => {
  if (error && typeof error === "object" && "response" in error) {
    const axiosError = error as AxiosError<{
      errors?: Record<string, string[] | string>;
      data?: {
        errors?: Record<string, string[] | string>;
      };
    }>;

    const responseData = axiosError.response?.data;
    const errors: Record<string, string> = {};

    if (responseData?.errors) {
      Object.entries(responseData.errors).forEach(([field, messages]) => {
        if (Array.isArray(messages)) {
          errors[field] = messages.join(", ");
        } else if (typeof messages === "string") {
          errors[field] = messages;
        }
      });
    } else if (responseData?.data?.errors) {
      Object.entries(responseData.data.errors).forEach(([field, messages]) => {
        if (Array.isArray(messages)) {
          errors[field] = messages.join(", ");
        } else if (typeof messages === "string") {
          errors[field] = messages;
        }
      });
    }

    return errors;
  }

  return {};
};
