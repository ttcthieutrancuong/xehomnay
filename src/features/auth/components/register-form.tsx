"use client";

import { registerSchema } from "@/features/auth/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

type Values = z.input<typeof registerSchema>;

export function RegisterForm() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(registerSchema) });

  const submit = handleSubmit(async (values) => {
    setError("");
    setMessage("");
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      if (!response.ok) setError(result.message ?? "Không thể tạo tài khoản.");
      else {
        setMessage(result.message);
      }
    } catch {
      setError("Không thể kết nối lúc này. Vui lòng thử lại sau.");
    }
  });

  return (
    <form
      onSubmit={submit}
      noValidate
      onChange={() => {
        setError("");
        setMessage("");
      }}
    >
      <Stack>
        {error && (
          <Alert color="red" title="Chưa thể tạo tài khoản">
            {error}
          </Alert>
        )}
        {message && <Alert color="blue">{message}</Alert>}
        <TextInput
          label="Họ và tên"
          withAsterisk
          required
          placeholder="Nguyễn Văn A"
          size="md"
          autoComplete="name"
          maxLength={100}
          {...register("name")}
          error={errors.name ? "Họ tên cần có từ 2 đến 100 ký tự." : undefined}
        />
        <TextInput
          label="Email"
          withAsterisk
          required
          type="email"
          placeholder="ten@email.com"
          size="md"
          autoComplete="email"
          {...register("email")}
          error={errors.email ? "Vui lòng nhập email hợp lệ." : undefined}
        />
        <PasswordInput
          label="Mật khẩu"
          withAsterisk
          required
          placeholder="Nhập mật khẩu"
          size="md"
          autoComplete="new-password"
          maxLength={128}
          {...register("password")}
          error={errors.password?.message}
        />
        <Button type="submit" loading={isSubmitting} fullWidth size="md">
          Tạo tài khoản
        </Button>
      </Stack>
    </form>
  );
}
