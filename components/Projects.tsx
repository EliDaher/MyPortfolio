"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import InventoryManagmentAd from "@/public/InventoryManagmentAd.png";
import DaherNetAd from "@/public/DaherNetAd.png";
import paynet from "@/public/paynet.png";

type Project = {
  name: string;
  tech: string[];
  desc: string;
  link?: string;
  img?: any;
  cols?: number;
  rows?: number;
};

/* ===============================
   Tailwind Safe Grid Span Mapping
================================ */
const colSpanClasses: Record<number, string> = {
  1: "md:col-span-1",
  2: "md:col-span-2",
  3: "md:col-span-3",
};

const rowSpanClasses: Record<number, string> = {
  1: "md:row-span-1",
  2: "md:row-span-2",
  3: "md:row-span-3",
};

/* ===============================
   Data
================================ */
const ProjectsData: Project[] = [
  {
    name: "ERP System",
    desc: "Full-featured ERP system for managing invoices, inventory, balances, and real-time financial data, built for real business operation",
    tech: [
      "NextJS",
      "TypeScript",
      "Firebase",
      "Express",
      "Socket.IO",
      "N8N",
      "Tailwind",
    ],
    link: "#",
    img: DaherNetAd,
    cols: 2,
    rows: 3,
  },
  {
    name: "PayNet",
    desc: "A comprehensive POS (Point of Sale) application that allows businesses to send invoices and payment codes for seamless transactions. Designed for efficiency and ease of use.",
    tech: ["React", "Node", "POS", "Payments"],
    link: "#",
    img: paynet,
    cols: 2,
    rows: 2,
  },
  {
    name: "Inventory Management System",
    desc: "Inventory management system for tracking stock levels, orders, and suppliers, designed to streamline daily business operations.",
    tech: ["React", "SQL", "Reporting"],
    link: "#",
    img: InventoryManagmentAd,
    cols: 2,
    rows: 2,
  },
];

/* ===============================
   Motion Variants
================================ */
const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
    scale: 0.97,
    filter: "blur(3px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.45,
    },
  },
};

const techContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const techItem: Variants = {
  hidden: { opacity: 0, y: 6, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

/* ===============================
   Component
================================ */
export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-28">
      <div
        className="
          px-4 sm:px-6 md:px-24 py-12 md:py-16
          grid gap-4 sm:gap-6
          [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]
          auto-rows-auto md:auto-rows-[220px]
        "
      >
        {ProjectsData.map((project, idx) => {
          const colSpan = colSpanClasses[project.cols ?? 1];
          const rowSpan = rowSpanClasses[project.rows ?? 1];

          return (
            <motion.div
              key={idx}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.3 }}
              className={`
                ${colSpan} ${rowSpan}
                relative group flex flex-col overflow-hidden rounded-xl sm:rounded-2xl
                backdrop-blur-lg bg-white/10 dark:bg-white/5
                border border-white/15
                shadow-md
                transition-all duration-300 ease-out
                hover:translate-y-[-2px]
                hover:shadow-xl
              `}
            >
              {/* Image */}
              {project.img && (
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.img}
                    alt={project.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain object-center transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              )}

              {/* Content */}
              <div className="flex flex-col flex-1 p-4">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-foreground">
                  {project.name}
                </h3>

                <p className="mt-2 text-sm text-foreground/75 leading-relaxed line-clamp-3">
                  {project.desc}
                </p>

                {/* Tech Stack */}
                {project.tech.length > 0 && (
                  <motion.div
                    variants={techContainer}
                    initial="hidden"
                    whileInView="visible"
                    className="mt-4 flex flex-wrap gap-2"
                  >
                    {project.tech.map((tech, index) => (
                      <motion.span
                        key={index}
                        variants={techItem}
                        className="
                          cursor-default
                          text-xs font-medium tracking-wide
                          px-3 py-1 rounded-full
                          bg-gradient-to-br from-indigo-500/15 to-indigo-400/5
                          border border-indigo-400/20
                          text-indigo-500
                          backdrop-blur-md
                          transition
                          hover:border-indigo-400/40
                          hover:bg-indigo-500/20
                        "
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>
                )}

                {/* Link (optional) */}
                {/* {project.link && (
                  <a
                    href={project.link}
                    className="mt-auto pt-4 inline-flex items-center gap-1 text-sm text-indigo-300 hover:text-indigo-400 transition"
                  >
                    View Project →
                  </a>
                )} */}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
