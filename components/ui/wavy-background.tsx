"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth = 10,
  backgroundFill,
  blur = 5,
  speed = "fast",
  waveOpacity = 0.5,
  waveCount = 5,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  waveCount?: number;
  [key: string]: any;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSafari, setIsSafari] = useState(false);
  const noise = createNoise3D();

  const getSpeed = () => (speed === "fast" ? 0.002 : 0.001);

  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome"),
    );
  }, []);

  useEffect(() => {
    let canvas = canvasRef.current;
    if (!canvas) return;
    let ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width =
      canvas.parentElement?.offsetWidth || window.innerWidth);
    let h = (canvas.height = canvas.parentElement?.offsetHeight || 200);
    ctx.filter = `blur(${blur}px)`;
    let nt = 0;

    const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const waveColors =
      colors ||
      (darkMode
        ? ["#6366f1", "#8b5cf6", "#c084fc", "#a78bfa", "#7c3aed"]
        : ["#38bdf8", "#60a5fa", "#818cf8", "#c084fc", "#e879f9"]);
    const bgColor = backgroundFill || (darkMode ? "#f3f4f600" : "#f3f4f600");

    const drawWave = () => {
      nt += getSpeed();
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = bgColor;
      ctx.globalAlpha = waveOpacity;
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < waveCount; i++) {
        ctx.beginPath();
        ctx.lineWidth = waveWidth;
        ctx.strokeStyle = waveColors[i % waveColors.length];
        for (let x = 0; x < w; x += 5) {
          const y = noise(x / 800, 0.3 * i, nt) * 50;
          ctx.lineTo(x, y + h * 0.5);
        }
        ctx.stroke();
        ctx.closePath();
      }
    };

    const animate = () => {
      drawWave();
      requestAnimationFrame(animate);
    };

    window.addEventListener("resize", () => {
      w = canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      h = canvas.height = canvas.parentElement?.offsetHeight || 200;
    });

    animate();
  }, [colors, blur, speed, waveWidth, waveOpacity, waveCount, backgroundFill]);

  return (
    <div className={cn("relative w-full overflow-hidden", containerClassName)}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0"
        style={isSafari ? { filter: `blur(${blur}px)` } : {}}
      />
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
