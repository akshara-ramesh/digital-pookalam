import React, { useEffect, useRef } from "react";

export default function Pookalam() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const PALETTE = ["#f7b500", "#ff6b00", "#e63946", "#ffd166", "#7bd389"];
    const rings = 10;
    const petalsPerRing = 24;

    const drawPookalam = (rotation = 0) => {
      const size = Math.min(window.innerWidth, window.innerHeight) * 0.7;
      canvas.width = size;
      canvas.height = size;

      ctx.clearRect(0, 0, size, size);
      ctx.save();
      ctx.translate(size / 2, size / 2);
      ctx.rotate(rotation); // apply rotation

      for (let r = rings; r > 0; r--) {
        const radius = (r * size) / (2.4 * rings); // fit inside canvas
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.fillStyle = PALETTE[r % PALETTE.length];
        ctx.fill();

        for (let p = 0; p < petalsPerRing; p++) {
          const angle = (p * 2 * Math.PI) / petalsPerRing;
          const petalRadius = radius / 2.5;
          const x = Math.cos(angle) * (radius - petalRadius / 2);
          const y = Math.sin(angle) * (radius - petalRadius / 2);

          ctx.beginPath();
          ctx.ellipse(
            x,
            y,
            petalRadius,
            petalRadius / 2,
            angle,
            0,
            2 * Math.PI
          );
          ctx.fillStyle = PALETTE[(p + r) % PALETTE.length];
          ctx.fill();
        }
      }

      ctx.restore();
    };

    let rotation = 0;

    const render = () => {
      drawPookalam(rotation);
      rotation += 0.002; // speed of spin (smaller = slower)
      requestAnimationFrame(render);
    };

    render();

    const handleResize = () => drawPookalam(rotation);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          color: "#d62828",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        🌸 HAPPY ONAM 🌸
      </h1>
      <canvas
        ref={canvasRef}
        width={Math.min(window.innerWidth * 0.9, 600)} // responsive width
        height={Math.min(window.innerWidth * 0.9, 600)} // responsive height
        style={{
          display: "block",
          maxWidth: "90vw",
          maxHeight: "90vw",
        }}
      />
    </div>
  );
}
