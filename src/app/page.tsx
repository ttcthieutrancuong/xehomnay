export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-16 text-center text-slate-900">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
        XeHômNay
      </p>
      <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
        Sẵn sàng cho chuyến đi tiếp theo?
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
        Tìm và thuê chiếc xe phù hợp cho hành trình của bạn. Dự án XeHômNay đã sẵn sàng để bắt đầu phát triển.
      </p>
      <a
        className="mt-10 rounded-full bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
        href="mailto:hello@xehomnay.vn"
      >
        Khám phá dịch vụ
      </a>
    </main>
  );
}
