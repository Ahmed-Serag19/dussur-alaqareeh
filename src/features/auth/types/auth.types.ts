import { z } from "zod";

// We'll create a function that returns schemas with translations
export const createLoginSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .string()
      .min(1, t("auth.validation.emailRequired"))
      .email(t("auth.validation.emailInvalid")),
    password: z
      .string()
      .min(1, t("auth.validation.passwordRequired"))
      .min(6, t("auth.validation.passwordMinLength")),
  });

export const createRegisterSchema = (t: (key: string) => string) =>
  z.object({
    name: z
      .string()
      .min(1, t("auth.validation.nameRequired"))
      .min(2, t("auth.validation.nameMinLength")),
    role: z.enum(["Admin", "User"]).default("Admin"),
    email: z
      .string()
      .min(1, t("auth.validation.emailRequired"))
      .email(t("auth.validation.emailInvalid")),
    phone: z
      .string()
      .min(1, t("auth.validation.phoneRequired"))
      .regex(/^[0-9+\-\s()]+$/, t("auth.validation.phoneInvalid")),
    password: z
      .string()
      .min(1, t("auth.validation.passwordRequired"))
      .min(6, t("auth.validation.passwordMinLength")),
  });

// Keep the original schemas for backward compatibility
export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Email is invalid"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  role: z.enum(["Admin", "User"]).default("Admin"),
  email: z.string().min(1, "Email is required").email("Email is invalid"),
  phone: z
    .string()
    .min(1, "Phone is required")
    .regex(/^[0-9+\-\s()]+$/, "Phone number is invalid"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export type LoginDto = z.infer<typeof loginSchema>;
export type RegisterDto = z.infer<typeof registerSchema>;
