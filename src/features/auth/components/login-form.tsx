"use client";

import { loginSchema } from "@/features/auth/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

type Values = z.input<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(loginSchema) });

  const submit = handleSubmit(async (values) => {
    setError("");
    try {
      const result = await signIn("credentials", {
        ...values,
        redirect: false,
      });
      if (result?.error) {
        setError("Email hoặc mật khẩu không chính xác.");
      } else {
        const session = await getSession();
        router.push(session?.user.role === "ADMIN" ? "/admin" : "/profile");
        router.refresh();
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
      }}
    >
      <Stack>
        {error && (
          <Alert color="red" title="Chưa thể đăng nhập">
            {error}
          </Alert>
        )}
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
          autoComplete="current-password"
          maxLength={128}
          {...register("password")}
          error={errors.password ? "Vui lòng nhập mật khẩu." : undefined}
        />
        <Button type="submit" loading={isSubmitting} fullWidth size="md">
          Đăng nhập
        </Button>
      </Stack>
    </form>
  );
}
