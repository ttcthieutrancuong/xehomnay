import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Họ tên cần có ít nhất 2 ký tự.")
    .max(100, "Họ tên không được quá 100 ký tự."),
  email: z
    .email({ error: "Email không hợp lệ." })
    .transform((value) => value.trim().toLowerCase()),
  password: z
    .string()
    .min(10, "Mật khẩu cần có ít nhất 10 ký tự.")
    .max(128, "Mật khẩu không được quá 128 ký tự."),
});

export const loginSchema = z.object({
  email: z
    .email({ error: "Email không hợp lệ." })
    .transform((value) => value.trim().toLowerCase()),
  password: z
    .string()
    .min(1, "Vui lòng nhập mật khẩu.")
    .max(128, "Mật khẩu không được quá 128 ký tự."),
});

