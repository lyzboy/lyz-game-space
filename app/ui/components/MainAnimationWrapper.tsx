"use client";

import { useState, useEffect, ReactNode } from "react";
import AuthorCard from "./AuthorCard";

interface Props {
  children: ReactNode;
}
const REVEAL_TIMER = 2000;
export default function MainAnimationWrapper({ children }: Props) {
  const [phase, setPhase] = useState<
    "intro" | "transition" | "curtain" | "complete"
  >("intro");
  return (
    <div>
      <AuthorCard />
      {children}
    </div>
  );
}
