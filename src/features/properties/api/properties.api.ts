import { axiosInstance } from "@/lib/axios";
import type { CreatePropertyDto } from "../types/property.types";

export const createProperty = async (
  data: CreatePropertyDto,
  images: File[] = []
) => {
  const formData = new FormData();

  // Append property as a JSON Blob with application/json content type
  // This matches the API spec where property is an object type in multipart/form-data
  formData.append(
    "property",
    new Blob([JSON.stringify(data)], { type: "application/json" })
  );

  // Append images as files (array format - multiple entries with same key)
  for (let i = 0; i < images.length; i++) {
    formData.append("images", images[i]);
  }

  // Log the FormData contents for debugging
  console.log("FormData contents:");
  console.log("Property data:", JSON.stringify(data, null, 2));
  console.log("Images count:", images.length);

  // Log FormData entries (for debugging)
  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(
        `FormData[${key}]: File - ${value.name}, size: ${value.size}`
      );
    } else {
      console.log(`FormData[${key}]:`, value);
    }
  }

  try {
    // Use axiosInstance to get interceptors (Accept-Language, Authorization)
    // The interceptor will automatically handle FormData Content-Type
    const response = await axiosInstance.post(
      "/temp-properties/addProperty",
      formData
    );
    return response;
  } catch (error) {
    // Enhanced error logging
    if (error && typeof error === "object" && "config" in error) {
      const axiosError = error as {
        config?: { url?: string; method?: string; headers?: unknown };
        response?: {
          status?: number;
          data?: unknown;
          headers?: unknown;
        };
      };
      console.error("Property creation failed:");
      console.error("Request URL:", axiosError.config?.url);
      console.error("Request method:", axiosError.config?.method);
      console.error("Request headers:", axiosError.config?.headers);
      console.error("Response status:", axiosError.response?.status);
      console.error("Response data:", axiosError.response?.data);
      console.error("Response headers:", axiosError.response?.headers);
    } else {
      console.error("Property creation failed:", error);
    }
    throw error;
  }
};
