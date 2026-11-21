import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Tên danh mục cần có ít nhất 2 ký tự.")
    .max(80, "Tên danh mục không được quá 80 ký tự."),
  description: z.string().trim().max(500, "Mô tả không được quá 500 ký tự."),
  isActive: z.boolean(),
});

export type CategoryInput = z.infer<typeof categorySchema>;
