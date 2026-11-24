# Chạy luồng xác thực ở local

## PostgreSQL

Project dùng database `xehomnay` trên PostgreSQL local. Trong `.env.local`, đặt `DATABASE_URL` theo user PostgreSQL trên máy của bạn.

```env
DATABASE_URL="postgresql://<postgres-user>@localhost:5432/xehomnay?schema=public"
```

Khởi động PostgreSQL rồi áp dụng migration và sinh Prisma Client:

```bash
npm run db:deploy
npm run db:generate
```

## Authentication

1. Chạy `npm run dev`.
2. Tạo tài khoản tại `/register`, sau đó đăng nhập tại `/login`. Không cần xác minh email.
3. Để cấp quyền quản trị cho tài khoản đã đăng ký:

   ```bash
   npm run admin:promote -- ten@email.com
   ```

Session dùng JWT trong cookie do Auth.js/NextAuth quản lý; role mặc định khi đăng ký là `USER`.
