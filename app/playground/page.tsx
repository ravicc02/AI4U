"use client";

import { useEffect, useRef } from "react";

/**
 * AI4U 像素校园 - 大场景全景页
 * 俯视视角，展示 AI4U 社区的像素世界
 */
export default function PlaygroundPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const T = 4; // 每格 4px
    const GW = 360; // 逻辑网格宽
    const GH = 480; // 逻辑网格高
    const W = GW * T;
    const H = GH * T;

    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d")!;

    // 离屏 canvas 用于静态地形
    const staticCanvas = document.createElement("canvas");
    staticCanvas.width = W;
    staticCanvas.height = H;
    const sc = staticCanvas.getContext("2d")!;

    // 动态层 canvas（角色 + 粒子）
    const dynCanvas = document.createElement("canvas");
    dynCanvas.width = W;
    dynCanvas.height = H;
    const dc = dynCanvas.getContext("2d")!;

    // 工具函数
    const px = (c: CanvasRenderingContext2D, x: number, y: number, color: string) => {
      c.fillStyle = color;
      c.fillRect(x * T, y * T, T, T);
    };

    const rect = (c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string) => {
      c.fillStyle = color;
      c.fillRect(x * T, y * T, w * T, h * T);
    };

    const hash = (x: number, y: number) => {
      return ((Math.sin(x * 127.1 + y * 311.7) * 43758.5453) % 1 + 1) % 1;
    };

    // ========== 地形判断 ==========
    const isLake = (x: number, y: number) => {
      const d = Math.sqrt((x - 180) ** 2 + (y - 280) ** 2);
      return d < 35 + Math.sin(x * 0.1) * 3 + Math.cos(y * 0.15) * 3;
    };

    const isPath = (x: number, y: number) => {
      // 主横道
      if (Math.abs(y - 120) < 3 && x > -10) return true;
      if (Math.abs(y - 360) < 3 && x > -10) return true;
      // 主竖道
      if (Math.abs(x - 80) < 3 && y > -10) return true;
      if (Math.abs(x - 280) < 3 && y > -10) return true;
      // 环湖路
      const d = Math.sqrt((x - 180) ** 2 + (y - 280) ** 2);
      if (Math.abs(d - 50) < 3) return true;
      return false;
    };

    const isFlowerBed = (x: number, y: number) => {
      // AI4U 字样花坛（中央）
      const cx = 180, cy = 240;
      // 简化版：矩形花坛
      return x > cx - 30 && x < cx + 30 && y > cy - 8 && y < cy + 8;
    };

    // ========== 构建静态地形 ==========
    const buildStatic = () => {
      // 草地基底
      for (let y = 0; y < GH; y++) {
        for (let x = 0; x < GW; x++) {
          const h = hash(x, y);
          px(sc, x, y, h > 0.7 ? "#7BAE56" : h > 0.4 ? "#6B9E4A" : h > 0.15 ? "#5B8C3E" : "#4E7A34");
        }
      }

      // 小路
      for (let y = 0; y < GH; y++) {
        for (let x = 0; x < GW; x++) {
          if (isPath(x, y)) {
            px(sc, x, y, hash(x, y) > 0.4 ? "#C4A46C" : "#B8975E");
          }
        }
      }

      // 湖泊
      for (let y = 0; y < GH; y++) {
        for (let x = 0; x < GW; x++) {
          if (isLake(x, y)) {
            px(sc, x, y, "#3B8DBD");
          }
        }
      }

      // 花坛（AI4U 字样）
      for (let y = 0; y < GH; y++) {
        for (let x = 0; x < GW; x++) {
          if (isFlowerBed(x, y)) {
            const colors = ["#FF6B9D", "#FFD93D", "#6BCF7F", "#A78BFA"];
            px(sc, x, y, colors[Math.floor(hash(x, y) * colors.length)]);
          }
        }
      }

      // ===== 建筑 =====

      // 咖啡厅（左上）
      rect(sc, 30, 40, 50, 36, "#D4A46C");
      rect(sc, 30, 36, 50, 4, "#8B5520"); // 屋顶
      rect(sc, 28, 34, 54, 2, "#A06830"); // 屋檐
      // 窗户
      rect(sc, 36, 44, 6, 6, "#87CEEB");
      rect(sc, 50, 44, 6, 6, "#87CEEB");
      rect(sc, 64, 44, 6, 6, "#87CEEB");
      // 门
      rect(sc, 48, 52, 8, 12, "#6B4226");

      // 图书馆（右上）
      rect(sc, 280, 40, 60, 44, "#C4A46C");
      rect(sc, 280, 36, 60, 4, "#8B5520");
      rect(sc, 278, 34, 64, 2, "#704020");
      // 窗户（多个）
      for (let i = 0; i < 5; i++) {
        rect(sc, 286 + i * 10, 46, 6, 6, "#87CEEB");
      }
      // 门
      rect(sc, 306, 56, 10, 14, "#6B4226");

      // 游乐场（中上）
      rect(sc, 140, 50, 80, 60, "#D4B87C");
      // 滑梯
      rect(sc, 150, 60, 4, 16, "#4488DD");
      rect(sc, 154, 60, 12, 2, "#4488DD");
      for (let i = 0; i < 12; i++) {
        px(sc, 154 + i, 62 + i, "#E84040");
      }
      // 秋千
      rect(sc, 180, 60, 2, 16, "#8B5520");
      rect(sc, 192, 60, 2, 16, "#8B5520");
      rect(sc, 180, 60, 14, 2, "#8B5520");

      // 凉亭（湖边）
      const pavilionX = 230, pavilionY = 280;
      rect(sc, pavilionX, pavilionY, 24, 20, "#C49A6C");
      rect(sc, pavilionX - 2, pavilionY - 4, 28, 4, "#8B5520"); // 屋顶
      // 柱子
      rect(sc, pavilionX + 2, pavilionY + 2, 2, 16, "#6B4226");
      rect(sc, pavilionX + 20, pavilionY + 2, 2, 16, "#6B4226");

      // 树木（随机分布）
      const trees = [
        [60, 180], [100, 160], [250, 140], [300, 200],
        [120, 320], [260, 340], [50, 400], [310, 420],
        [40, 260], [320, 300]
      ];
      trees.forEach(([tx, ty]) => {
        // 树干
        rect(sc, tx, ty, 4, 8, "#6B4226");
        // 树冠（简化圆形）
        for (let dy = -6; dy < 2; dy++) {
          for (let dx = -6; dx < 6; dx++) {
            if (dx * dx + dy * dy < 30) {
              px(sc, tx + 2 + dx, ty + dy, hash(tx + dx, ty + dy) > 0.5 ? "#4A7C3A" : "#3A6C2A");
            }
          }
        }
      });
    };

    // ========== 螃蟹身体矩阵（16x9 格） ==========
    const crabBody = [
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
      [0,1,1,1,1,2,1,1,1,1,2,1,1,1,1,0],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0],
      [0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0],
      [0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0],
    ];

    interface Crab {
      x: number;
      y: number;
      hat: string | null;
      eyeDir: number; // 0=forward, 1=right, 2=left
      animPhase: number;
    }

    // ========== 螃蟹角色定义 ==========
    const crabs: Crab[] = [
      // 咖啡厅区域（3只）
      { x: 45, y: 85, hat: "chef", eyeDir: 1, animPhase: 0 },
      { x: 60, y: 88, hat: "party", eyeDir: 2, animPhase: 30 },
      { x: 52, y: 92, hat: null, eyeDir: 0, animPhase: 60 },

      // 图书馆区域（5只）
      { x: 290, y: 90, hat: "wizard", eyeDir: 0, animPhase: 10 },
      { x: 310, y: 92, hat: null, eyeDir: 1, animPhase: 40 },
      { x: 320, y: 95, hat: "crown", eyeDir: 2, animPhase: 70 },
      { x: 295, y: 98, hat: null, eyeDir: 0, animPhase: 20 },
      { x: 325, y: 100, hat: "wizard", eyeDir: 1, animPhase: 50 },

      // 游乐场区域（6只）
      { x: 155, y: 85, hat: "party", eyeDir: 0, animPhase: 15 },
      { x: 170, y: 88, hat: "headband", eyeDir: 1, animPhase: 45 },
      { x: 185, y: 90, hat: null, eyeDir: 2, animPhase: 75 },
      { x: 200, y: 92, hat: "cap", eyeDir: 0, animPhase: 5 },
      { x: 160, y: 100, hat: null, eyeDir: 1, animPhase: 35 },
      { x: 195, y: 105, hat: "party", eyeDir: 2, animPhase: 65 },

      // 中央花坛区域（4只拍照）
      { x: 165, y: 235, hat: "party", eyeDir: 0, animPhase: 25 },
      { x: 175, y: 238, hat: null, eyeDir: 1, animPhase: 55 },
      { x: 185, y: 236, hat: "crown", eyeDir: 0, animPhase: 85 },
      { x: 195, y: 240, hat: "party", eyeDir: 2, animPhase: 15 },

      // 湖边散步（5只）
      { x: 145, y: 270, hat: null, eyeDir: 1, animPhase: 30 },
      { x: 155, y: 290, hat: "cap", eyeDir: 0, animPhase: 60 },
      { x: 210, y: 265, hat: null, eyeDir: 2, animPhase: 90 },
      { x: 200, y: 310, hat: "wizard", eyeDir: 1, animPhase: 20 },
      { x: 225, y: 320, hat: null, eyeDir: 0, animPhase: 50 },

      // 凉亭休息（3只）
      { x: 238, y: 288, hat: "chef", eyeDir: 1, animPhase: 40 },
      { x: 245, y: 290, hat: null, eyeDir: 2, animPhase: 70 },
      { x: 235, y: 293, hat: "party", eyeDir: 0, animPhase: 10 },

      // 下方草坪区域（6只）
      { x: 90, y: 380, hat: "headband", eyeDir: 0, animPhase: 35 },
      { x: 110, y: 385, hat: null, eyeDir: 1, animPhase: 65 },
      { x: 130, y: 390, hat: "party", eyeDir: 2, animPhase: 95 },
      { x: 240, y: 375, hat: "crown", eyeDir: 0, animPhase: 25 },
      { x: 260, y: 380, hat: null, eyeDir: 1, animPhase: 55 },
      { x: 280, y: 385, hat: "wizard", eyeDir: 2, animPhase: 85 },

      // 散落各处（8只）
      { x: 120, y: 200, hat: null, eyeDir: 1, animPhase: 45 },
      { x: 250, y: 180, hat: "cap", eyeDir: 0, animPhase: 75 },
      { x: 80, y: 300, hat: null, eyeDir: 2, animPhase: 5 },
      { x: 320, y: 250, hat: "party", eyeDir: 1, animPhase: 35 },
      { x: 60, y: 220, hat: "chef", eyeDir: 0, animPhase: 65 },
      { x: 300, y: 360, hat: null, eyeDir: 2, animPhase: 95 },
      { x: 150, y: 420, hat: "headband", eyeDir: 1, animPhase: 15 },
      { x: 220, y: 440, hat: "crown", eyeDir: 0, animPhase: 45 },
    ];

    // ========== 绘制螃蟹 ==========
    const drawCrab = (c: CanvasRenderingContext2D, crab: Crab, frame: number) => {
      const { x, y, hat, eyeDir, animPhase } = crab;
      const bodyColor = "#CD6E58";
      const eyeColor = "#000";

      // 身体
      for (let row = 0; row < crabBody.length; row++) {
        for (let col = 0; col < crabBody[row].length; col++) {
          if (crabBody[row][col] === 1) {
            px(c, x + col, y + row, bodyColor);
          } else if (crabBody[row][col] === 2) {
            // 眼睛位置根据 eyeDir 调整
            let eyeX = col, eyeY = row;
            if (eyeDir === 1) eyeX += 1; // 向右看
            if (eyeDir === 2) eyeX -= 1; // 向左看
            px(c, x + eyeX, y + eyeY, eyeColor);
          }
        }
      }

      // 帽子（简化版）
      if (hat) {
        const hatColors: Record<string, string> = {
          wizard: "#443388",
          chef: "#F0F0F0",
          party: "#FF88AA",
          crown: "#FFDD33",
          headband: "#DC2828",
          cap: "#4488DD"
        };
        const color = hatColors[hat] || "#888";
        // 简单矩形帽子
        rect(c, x + 4, y - 2, 8, 3, color);
      }

      // 轻微动画（上下微动）
      const offset = Math.sin((frame + animPhase) * 0.05) * 0.5;
      c.globalAlpha = 1;
    };

    // ========== 樱花粒子 ==========
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * GW,
        y: Math.random() * GH,
        vx: (Math.random() - 0.5) * 0.3,
        vy: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.5 ? "#FFB7C5" : "#FFC8D4"
      });
    }

    // ========== 动画循环 ==========
    let frame = 0;
    buildStatic();

    const animate = () => {
      frame++;

      // 清除动态层
      dc.clearRect(0, 0, W, H);

      // 绘制水面动画（简化：微微闪烁）
      for (let y = 0; y < GH; y++) {
        for (let x = 0; x < GW; x++) {
          if (isLake(x, y)) {
            const shimmer = Math.sin((x + y + frame * 0.1) * 0.2) * 0.05 + 0.95;
            dc.globalAlpha = shimmer;
            px(dc, x, y, "#5BA8D8");
          }
        }
      }
      dc.globalAlpha = 1;

      // 绘制螃蟹
      crabs.forEach(crab => drawCrab(dc, crab, frame));

      // 绘制粒子
      particles.forEach(p => {
        px(dc, Math.floor(p.x), Math.floor(p.y), p.color);
        p.x += p.vx;
        p.y += p.vy;
        if (p.y > GH) {
          p.y = -5;
          p.x = Math.random() * GW;
        }
        if (p.x < 0) p.x = GW;
        if (p.x > GW) p.x = 0;
      });

      // 合成到主 canvas
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(staticCanvas, 0, 0);
      ctx.drawImage(dynCanvas, 0, 0);

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#2a3a2a",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem 1rem"
    }}>
      <div style={{ maxWidth: "1200px", width: "100%", textAlign: "center", marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "#F4F0E8", marginBottom: "0.5rem" }}>
          AI4U 像素校园
        </h1>
        <p style={{ color: "#B8A88E", fontSize: "0.875rem" }}>
          40 只小螃蟹的日常 · 咖啡厅 · 图书馆 · 游乐场 · 湖边 · 花坛
        </p>
      </div>
      <canvas
        ref={canvasRef}
        style={{
          maxWidth: "100%",
          maxHeight: "80vh",
          imageRendering: "pixelated",
          border: "2px solid rgba(244, 240, 232, 0.2)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)"
        }}
      />
    </div>
  );
}
