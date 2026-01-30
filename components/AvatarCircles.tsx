"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import MyPhoto from "@/public/MyPhoto.png";
import DaherNetAd from "@/public/DaherNetAd.png";
import paynet from "@/public/paynet.png";

const images = [MyPhoto, DaherNetAd, paynet];
const SIZE = 185;

export default function ClickAvatarSwitcher() {
  const [activeIndex, setActiveIndex] = useState(0);

    const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // دالة النقر على الزر
    const clickButton = () => {
      if (buttonRef.current) {
        buttonRef.current.click();
      }
    };

    // تشغيل المؤقت كل 3 ثواني
    const interval = setInterval(clickButton, 8000);

    // تنظيف المؤقت عند فك المكون
    return () => clearInterval(interval);
  }, []);


  const next = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative h-[300px] flex justify-end pr-52 mt-52 md:mt-20 md:pr-80 overflow-hidden">
      {/* منطقة النقر */}
      <button
        ref={buttonRef}
        onClick={next}
        className="relative cursor-pointer group select-none"
        aria-label="Next image"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{
              opacity: 0.5,
              scale: 0.85,
             // y: 40,
              rotate: -180,
              filter: "blur(5px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              //y: 0,
              rotate: 0,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0.5,
              scale: 0.9,
              //y: -60,
              rotate: 180,
              filter: "blur(3px)",
            }}
            transition={{
              duration: 0.5,
              //ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0 rounded-full p-1 will-change-transform"
            style={{
              width: SIZE,
              height: SIZE,
              background: "linear-gradient(45deg, #6366f1, #8b5cf6, #ec4899)",
            }}
            whileHover={{
              scale: 1.05,
            }}
          >
            <div className="relative p-[4px] rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-2xl">
              <div className="bg-black rounded-full p-1">
                <Image
                  src={images[activeIndex]}
                  alt="Preview"
                  className="w-40 h-40 object-contain rounded-full pointer-events-none select-none"
                  draggable={false}
                  priority
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </button>

      {/* مؤشر التوجيه */}
      <div className="absolute top-24 right-[15px] md:right-[130px] flex items-center gap-2 pointer-events-none select-none rotate-45">
        <svg width="300" height="100" viewBox="0 0 300 100">
          <defs>
            <path
              id="curvePath"
              d="M50 45 C 100 90, 170 130, 300 10"
              fill="transparent"
            />
          </defs>
          <text writingMode={""} fill="gray" fontSize="18" fontWeight="bold">
            <textPath href="#curvePath">Click here and Watch</textPath>
          </text>
        </svg>
      </div>
    </div>
  );
}
