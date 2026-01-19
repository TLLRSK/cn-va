"use client";

import { MediaDetails } from "@/types/types";
import { useState } from "react";

const useLightbox = (initialIndex: number, imagesArr: MediaDetails[]) => {
  const [index, setIndex] = useState(initialIndex);

  const [swipe, setSwipe] = useState<{
    phase: "start" | "end" | null;
    direction: "next" | "prev" | null;
  }>({ phase: null, direction: null });

  const prev = () => setIndex((i) => (i === 0 ? imagesArr.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === imagesArr.length - 1 ? 0 : i + 1));

  const handleSwiping = (direction: "next" | "prev") => {
    setSwipe({ phase: "start", direction });

    setTimeout(() => {
      if (direction === "next") {
        next();
      } else {
        prev();
      }
      setSwipe({ phase: "end", direction });

      setTimeout(() => {
        setSwipe({ phase: null, direction: null });
      }, 500);
    }, 100);
  };

  return { index, handleSwiping, swipe };
};

export default useLightbox;