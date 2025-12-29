"use client";

import React, { useState } from "react";
import { CometCard } from "@/components/ui/comet-card";

type CardItem = {
  title: string;
  desc: string;
  tag?: string;
};

export function InfiniteCometCards({
  items,
  direction = "left",
}: {
  items: CardItem[];
  direction?: "left" | "right";
}) {
  const [paused, setPaused] = useState(false);

  return (
    <div
      className="relative overflow-hidden py-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Star background */}
      <div className="pointer-events-none absolute inset-0 opacity-20 bg-[radial-gradient(1px_1px_at_20%_30%,white,transparent),radial-gradient(1px_1px_at_80%_40%,white,transparent),radial-gradient(1px_1px_at_50%_70%,white,transparent)]" />

      {/* VIEWPORT */}
      <div className="overflow-hidden w-full">
        {/* MOVING STRIP (200%) */}
        <div
          className="flex w-[200%] will-change-transform"
          style={{
            animationName: direction === "left" ? "scroll-left" : "scroll-right",
            animationDuration: "30s",
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {/* Track A */}
          <Track items={items} />

          {/* Track B (duplicate) */}
          <Track items={items} />
        </div>
      </div>
    </div>
  );
}

function Track({ items }: { items: CardItem[] }) {
  return (
    <div className="flex w-full gap-8 px-8">
      {items.map((item, idx) => (
        <CometCard key={idx}>
          <div className="w-[360px] shrink-0 rounded-2xl border border-white/10 bg-black/80 p-6 backdrop-blur-xl">
            {item.tag && (
              <span className="inline-block mb-4 rounded bg-red-600 px-3 py-1 text-xs font-semibold">
                {item.tag}
              </span>
            )}
            <h3 className="text-xl font-bold text-white mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-white/60">{item.desc}</p>
          </div>
        </CometCard>
      ))}
    </div>
  );
}
