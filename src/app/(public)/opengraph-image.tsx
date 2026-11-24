import { ImageResponse } from "next/og";

export const alt = "Dịch vụ thuê xe xehomnay.com";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        padding: "64px 72px",
        background:
          "linear-gradient(130deg, #082b55 0%, #0b3b75 55%, #1769e0 100%)",
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -160,
          right: -70,
          width: 580,
          height: 580,
          border: "1px solid rgba(234,244,255,.18)",
          borderRadius: 290,
          boxShadow:
            "0 0 0 32px rgba(234,244,255,.04), 0 0 0 86px rgba(234,244,255,.03)",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              width: 52,
              height: 52,
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(255,255,255,.22)",
              borderRadius: 16,
              background: "rgba(255,255,255,.1)",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 13.5 4.8 8.8c.4-1 1.3-1.6 2.4-1.6h9.6c1.1 0 2 .6 2.4 1.6l1.8 4.7v4.1h-2v-1.5H5v1.5H3v-4.1Z"
                stroke="#82c2ff"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
              <path
                d="M4 13.5h16M7 16.1h.1m9.8 0h.1"
                stroke="#82c2ff"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div style={{ display: "flex", fontSize: 28, fontWeight: 700 }}>
            xehomnay<span style={{ color: "#82c2ff" }}>.com</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "9px 15px",
              border: "1px solid rgba(234,244,255,.2)",
              borderRadius: 20,
              background: "rgba(255,255,255,.1)",
              color: "#d5e9ff",
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: 1.2,
            }}
          >
            DỊCH VỤ THUÊ XE THEO NHU CẦU
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 58,
              fontWeight: 700,
              letterSpacing: -2.4,
              lineHeight: 1.12,
            }}
          >
            <span>Thuê xe đúng nhu cầu.</span>
            <span>
              Chủ động <span style={{ color: "#82c2ff" }}>hành trình.</span>
            </span>
          </div>
          <div
            style={{
              display: "flex",
              color: "rgba(234,244,255,.78)",
              fontSize: 21,
            }}
          >
            Xe du lịch · văn phòng · cưới · tháng · tự lái · VIP
          </div>
        </div>
      </div>
    </div>,
    size,
  );
}
