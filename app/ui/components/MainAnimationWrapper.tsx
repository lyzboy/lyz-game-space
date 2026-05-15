"use client";

import { useState, useEffect, ReactNode } from "react";
import AuthorCard from "./AuthorCard";

interface Props {
  children: ReactNode;
}
const REVEAL_TIMER = 2000;
const TRANSITION_TIMER = 500;
const BLUR_TIMER = 1500;
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
      <AuthorCard />
      {children}
    </div>
  );
}
