"use client";

import { WavyBackground } from "./ui/wavy-background";


const SectionDivider = ({text}: {text?: string}) => {
  return (
    <WavyBackground className="h-[120px] py-10">
      <div className="text-4xl font-bold text-center">{text}</div>
    </WavyBackground>
  );
};

export default SectionDivider;
