import { useRef, useEffect, useState } from "react";

export default function Button({ children, ...props }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!isHovering) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = 16;
    canvas.height = 16;

    ctx.translate(0, 16);
    ctx.scale(1, -1);

    const fps = 7;
    const interval = 1000 / fps;
    let prev = Date.now();

    const y = [2, 1, 0, 0, 0, 0, 1, 2];
    const max = [7, 9, 11, 13, 13, 11, 9, 7];
    const min = [4, 7, 8, 10, 10, 8, 7, 4];

    function flame() {
      const now = Date.now();
      const dif = now - prev;

      if (dif > interval) {
        prev = now;
        ctx.clearRect(0, 0, 16, 16);

        ctx.strokeStyle = "#d14234";
        let i = 0;
        for (let x = 4; x < 12; x++) {
          const a = Math.random() * (max[i] - min[i] + 1) + min[i];
          ctx.beginPath();
          ctx.moveTo(x + 0.5, y[i++]);
          ctx.lineTo(x + 0.5, a);
          ctx.stroke();
        }

        ctx.strokeStyle = "#f2a55f";
        let j = 1;
        for (let x = 5; x < 11; x++) {
          const a = Math.random() * (max[j] - 5 - (min[j] - 5) + 1) + (min[j] - 5);
          ctx.beginPath();
          ctx.moveTo(x + 0.5, y[j++] + 1);
          ctx.lineTo(x + 0.5, a);
          ctx.stroke();
        }

        ctx.strokeStyle = "#e8dec5";
        let k = 3;
        for (let x = 7; x < 9; x++) {
          const a = Math.random() * (max[k] - 9 - (min[k] - 9) + 1) + (min[k] - 9);
          ctx.beginPath();
          ctx.moveTo(x + 0.5, y[k++]);
          ctx.lineTo(x + 0.5, a);
          ctx.stroke();
        }
      }

      animationRef.current = requestAnimationFrame(flame);
    }

    flame();

    return () => {
      cancelAnimationFrame(animationRef.current);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, 16, 16);
    };
  }, [isHovering]);

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <button {...props}>{children}</button>

      {isHovering && (
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            bottom: "4px",
            right: "4px",
            width: "48px",
            height: "48px",
            pointerEvents: "none",
            imageRendering: "pixelated",
            opacity: 0.7,
            filter: "drop-shadow(0 0 6px #ff7e00)"
          }}
        />
      )}
    </div>
  );
}
