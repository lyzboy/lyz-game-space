"use client";

import { useState, useEffect, ReactNode } from "react";
import AuthorCard from "./AuthorCard";
import { DiaTextReveal } from "@/components/ui/dia-text-reveal";
import { easeIn, motion } from "motion/react";

interface Props {
  children: ReactNode;
}
const REVEAL_TIMER = 1500;
const TRANSITION_TIMER = 500;
const BLUR_TIMER = 1000;
export default function MainAnimationWrapper({ children }: Props) {
  const [phase, setPhase] = useState<
    "intro" | "transition" | "curtain" | "complete"
  >("intro");

  useEffect(() => {
    switch (phase) {
      case "intro":
        console.log(`in intro phase...`);
        const firstTimer = setTimeout(
          () => setPhase("transition"),
          REVEAL_TIMER,
        );
        return () => clearTimeout(firstTimer);
      case "transition":
        console.log(`in transition phase...`);
        const secondTimer = setTimeout(
          () => setPhase("curtain"),
          TRANSITION_TIMER,
        );
        return () => clearTimeout(secondTimer);
      case "curtain":
        console.log(`in curtain phase...`);
        const thirdTimer = setTimeout(() => setPhase("complete"), BLUR_TIMER);
        return () => clearTimeout(thirdTimer);
      case "complete":
        console.log("animation completed!");
        return;
      default:
        return;
    }
  }, [phase]);
  return (
    <div>
      <motion.div
        initial={{ y: 0, opacity: 1 }}
        animate={
          phase == "intro"
            ? { y: 0, opacity: 1 }
            : { y: -200, opacity: 0, visibility: "hidden" }
        }
        transition={{ duration: TRANSITION_TIMER / 1000, ease: easeIn }}
        className="fixed inset-0 flex items-center justify-center"
      >
        <DiaTextReveal
          className="text-4xl font-bold tracking-tight"
          text="Hi, I'm Josh"
          duration={REVEAL_TIMER / 1000}
          colors={["#b2bfe7", "#7290d3", "#0863bf"]}
        />
      </motion.div>
      <motion.div
        initial={{
          maskImage:
            "linear-gradient(to bottom, black 0%, black 0%, transparent 0%, transparent 100%)",
        }}
        animate={
          phase === "curtain" || phase === "complete"
            ? {
                maskImage:
                  "linear-gradient(to bottom, black 80%, black 100%, transparent 120%, transparent 120%)",
              }
            : {
                maskImage:
                  "linear-gradient(to bottom, black 0%, black 0%, transparent 0%, transparent 100%)",
              }
        }
        transition={{
          duration: BLUR_TIMER / 1000,
          ease: "easeInOut",
        }}
      >
        <AuthorCard />
        {children}
      </motion.div>
    </div>
  );
}
