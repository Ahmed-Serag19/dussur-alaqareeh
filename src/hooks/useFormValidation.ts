import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function useFormValidation(schema: any) {
  return useForm({
    resolver: zodResolver(schema),
  });
}
