"use client";

import { useEffect, useRef } from "react";

/**
 * 举爱心摇摆的螃蟹动画
 * 用于 Join Us 区域，表达欢迎和热情
 */
export default function WelcomeCrab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const T = 6; // 每格 6px
    const GW = 20;
    const GH = 20;
    const W = GW * T;
    const H = GH * T;

    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d")!;

    const px = (x: number, y: number, color: string) => {
      ctx.fillStyle = color;
      ctx.fillRect(x * T, y * T, T, T);
    };

    // 螃蟹身体数据（简化版 14x8）
    const bodyColor = "#CD6E58";
    const eyeColor = "#000";

    let frame = 0;

    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, W, H);

      // 摇摆角度
      const sway = Math.sin(frame * 0.08) * 2;
      const bounce = Math.sin(frame * 0.06) * 0.5;

      ctx.save();
      ctx.translate(W / 2, H / 2 + bounce * T);
      ctx.rotate((sway * Math.PI) / 180);
      ctx.translate(-W / 2, -H / 2);

      const cx = 3, cy = 8;

      // 身体
      const body = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,1,1,1,1,1,1,1,1,1,0,0],
        [0,1,1,1,1,2,1,1,1,1,2,1,1,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [0,1,1,0,1,1,0,1,1,0,1,1,0,0],
        [0,0,0,0,0,1,1,0,0,1,1,0,0,0],
      ];

      body.forEach((row, ry) => {
        row.forEach((cell, rx) => {
          if (cell === 1) {
            px(cx + rx, cy + ry, bodyColor);
          } else if (cell === 2) {
            px(cx + rx, cy + ry, eyeColor);
          }
        });
      });

      // 爱心（在螃蟹上方）
      const heartScale = 1 + Math.sin(frame * 0.1) * 0.1;
      const heartColor = "#FF6B9D";

      const hx = 7, hy = 3;
      // 简化爱心形状
      const heart = [
        [0,1,1,0,0,1,1,0],
        [1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1],
        [0,1,1,1,1,1,1,0],
        [0,0,1,1,1,1,0,0],
        [0,0,0,1,1,0,0,0],
      ];

      ctx.globalAlpha = 0.9;
      heart.forEach((row, ry) => {
        row.forEach((cell, rx) => {
          if (cell === 1) {
            px(hx + rx, hy + ry, heartColor);
          }
        });
      });
      ctx.globalAlpha = 1;

      ctx.restore();

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        imageRendering: "pixelated",
        display: "block"
      }}
    />
  );
}
