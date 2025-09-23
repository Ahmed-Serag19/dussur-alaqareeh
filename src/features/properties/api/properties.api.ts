import axios from "axios";
import type { CreatePropertyDto } from "../types/property.types";

export const createProperty = async (
  data: CreatePropertyDto,
  images: File[] = []
) => {
  const formData = new FormData();

  // Append property as a JSON Blob with correct content type
  formData.append(
    "property",
    new Blob([JSON.stringify(data)], { type: "application/json" })
  );

  // Append images as files
  for (let i = 0; i < images.length; i++) {
    formData.append("images", images[i]);
  }

  const multipartAxios = axios.create({
    baseURL: "https://backend.aqaar.dussur.sa/api",
  });

  const token = localStorage.getItem("token");
  if (token) {
    multipartAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  // Do NOT set Content-Type header, let the browser handle it
  const response = await multipartAxios.post(
    "/temp-properties/addProperty",
    formData
  );
  return response;
};
