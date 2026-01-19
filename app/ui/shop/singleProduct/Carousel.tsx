"use client";
import { useEffect, useRef, useState } from "react";
import { ResponsiveImage } from "@/app/ui/images/ResponsiveImage";
import { TransformedImageData } from "@/types/types";

export default function Carousel({
  images,
}: {
  images: TransformedImageData[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToImage = (index: number) => {
    const container = containerRef.current;
    const child = container?.children[index] as HTMLElement;
    if (container && child) {
      if (window.innerWidth >= 768) {
        container.scrollTo({
          top: child.offsetTop,
          behavior: "smooth",
        });
      } else {
        container.scrollTo({
          left: child.offsetLeft,
          behavior: "smooth",
        });
      }
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const children = Array.from(container.children) as HTMLElement[];
      let newIndex = 0;
      let closestDistance = Infinity;

      children.forEach((child, index) => {
        const rect = child.getBoundingClientRect();
        const distance =
          window.innerWidth >= 768 ? Math.abs(rect.top) : Math.abs(rect.left);

        if (distance < closestDistance) {
          closestDistance = distance;
          newIndex = index;
        }
      });

      setActiveIndex(newIndex);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="carousel relative w-full md:h-fit overflow-hidden md:col-span-7 2xl:col-span-8 px-sm md:pl-0 md:pr-lg">
      <div
        ref={containerRef}
        className={`flex md:flex-col overflow-x-auto md:overflow-y-auto snap-x md:snap-y snap-mandatory scroll-smooth touch-pan-x no-scrollbar
        `}
      >
        {images.map((image, i) => (
          i === 0
          ? null
          : (
            <div
            key={i}
            className={`flex-shrink-0 md:flex-shrink w-full aspect-square md:aspect-auto snap-start md:max-h-screen md:rounded-none md:overflow-hidden`}
          >
            <img
              src={image.url}
              alt={image.alt}
              srcSet={image.srcSet}
              className="object-cover w-full h-auto aspect-square"
            />
          </div>
          )
        ))}
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-10 md:hidden">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToImage(i)}
            className={`w-4 h-4 rounded-full transition-colors ${
              i === activeIndex ? "bg-background" : "bg-highlight"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
