import React, { useEffect, useRef, useState } from "react";

export default function Pookalam() {
  const canvasRef = useRef(null);
  const [paletteIndex, setPaletteIndex] = useState(0);

  const PALETTES = [
        
    ["#f7b500", "#ff6b00", "#e63946", "#ffd166", "#7bd389"],
    ["#7209b7", "#b5179e", "#f72585", "#ffb703", "#ffdd00"],
    ["#556B2F", "#759342ff", "#8FA31E", "#C6D870", "#EFF5D2"],
    ["#FF0000", "#FF7100", "#FFA900", "#FFCB00", "#FFF800"],
    ["#FF8800", "#FFB347", "#FFD700", "#E63946", "#5A189A"],
    ["#004225", "#146B3A", "#6A994E", "#fdec91ff", "#F2E8CF"],
    ["#ffb703", "#fb8500", "#e5383b", "#9d0208", "#ffba08"]
    
    
    
    
    
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let rotation = 0;

    const render = () => {
      const size = Math.min(window.innerWidth, window.innerHeight) * 0.7;
      canvas.width = size;
      canvas.height = size;

      ctx.clearRect(0, 0, size, size);
      ctx.save();
      ctx.translate(size / 2, size / 2);
      ctx.rotate(rotation);

      const palette = PALETTES[paletteIndex];
      const rings = 10;
      const petalsPerRing = 24;

      for (let r = rings; r > 0; r--) {
        const radius = (r * size) / (2.4 * rings);
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.fillStyle = palette[r % palette.length];
        ctx.fill();

        for (let p = 0; p < petalsPerRing; p++) {
          const angle = (p * 2 * Math.PI) / petalsPerRing;
          const petalRadius = radius / 2.5;
          const x = Math.cos(angle) * (radius - petalRadius / 2);
          const y = Math.sin(angle) * (radius - petalRadius / 2);

          ctx.beginPath();
          ctx.ellipse(x, y, petalRadius, petalRadius / 2, angle, 0, 2 * Math.PI);
          ctx.fillStyle = palette[(p + r) % palette.length];
          ctx.fill();
        }
      }

      ctx.restore();
      rotation += 0.001; // slow spin
      requestAnimationFrame(render);
    };

    render();

    // Change palette every 6 seconds
    const colorInterval = setInterval(() => {
      setPaletteIndex((prev) => (prev + 1) % PALETTES.length);
    }, 6000);

    window.addEventListener("resize", render);
    return () => {
      clearInterval(colorInterval);
      window.removeEventListener("resize", render);
    };
  }, [paletteIndex]);

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
        width={Math.min(window.innerWidth * 0.9, 600)}
        height={Math.min(window.innerWidth * 0.9, 600)}
        style={{
          display: "block",
          maxWidth: "90vw",
          maxHeight: "90vw",
        }}
      />
    </div>
  );
}
