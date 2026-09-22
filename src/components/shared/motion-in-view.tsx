"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { fadeInUp, viewportOnce } from "@/lib/motion";

type MotionInViewProps = HTMLMotionProps<"div"> & {
  delay?: number;
};

/** Wrap any block to fade/slide it in when it scrolls into view. */
export function MotionInView({ delay = 0, ...props }: MotionInViewProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
      {...props}
    />
  );
}
