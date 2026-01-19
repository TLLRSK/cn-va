"use client";
import { createPortal } from "react-dom";
import ButtonClose from "../buttons/ButtonClose";
import Overlay from "../global/Overlay";
import { ResponsiveImage } from "../images/ResponsiveImage";
import { useSingleProject } from "@/app/context/singleProjectContext";
import useLightbox from "@/hooks/useLightbox";
import useBlockScrolling from "@/hooks/useBlockScrolling";
import { TiChevronLeft, TiChevronRight } from "react-icons/ti";

const Lightbox = ({ initialIndex = 0 }: { initialIndex?: number }) => {
  const { imagesArr, lightboxOpen, closeLightbox } = useSingleProject();
  const { index, handleSwiping, swipe } = useLightbox(initialIndex, imagesArr);

  useBlockScrolling(lightboxOpen);

  const lightboxContent = (
    <>
      <div
        className={`lightbox fixed inset-0 z-[100] flex items-center justify-center p-sm md:px-md lg:px-lg opacity-100
          transition-opacity duration-300`}
      >
        <ButtonClose
          onClose={closeLightbox}
          color="highlight"
          className="absolute top-0 right-0 mt-sm mr-sm md:mr-md"
        />

        <div className="ae absolute bottom-0 left-1/2 mb-xs pb-sm">
          <h3 className="text-inverse text-sm font-medium">
            {index + 1} / {imagesArr.length}
          </h3>
        </div>

        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          {imagesArr.map((image, i) => {
            const isActive = i === index;

            let anim = "";

            if (swipe.phase === "start") {
              if (isActive && swipe.direction === "next")
                anim = "animate-swipe-out-left";
              if (isActive && swipe.direction === "prev")
                anim = "animate-swipe-out-right";
            }

            if (swipe.phase === "end" && isActive) {
              if (swipe.direction === "next") anim = "animate-swipe-in-right";
              if (swipe.direction === "prev") anim = "animate-swipe-in-left";
            }

            return (
              <ResponsiveImage
                key={i}
                image={image}
                className={`
                  lightbox-image md:max-w-[66vw] md:min-h-50dvh lg:max-w-[75vw] lg:max-h-[80dvh] absolute object-contain translate-y-0 will-change-transform
                  ${
                    isActive && swipe.phase === null
                      ? "opacity-100 scale-100 z-10"
                      : "opacity-0 scale-50"
                  }
                  ${anim}
                `}
              />
            );
          })}
        </div>

        {imagesArr.length > 1 && (
          <div className="ae w-full flex items-center justify-between absolute right-0 bottom-0 md:top-0 px-sm md:px-md mb-sm">
            <button
              onClick={() => handleSwiping("prev")}
              disabled={swipe.phase != null}
              className={`w-16 h-auto aspect-square btn-lightbox--prev flex items-center justify-center bg-highlight rounded-full text-secondary overflow-hidden xl:hover:bg-inverse transition-colors duration-300`}
            >
              <TiChevronLeft className="w-14 h-auto" />
            </button>

            <button
              onClick={() => handleSwiping("next")}
              disabled={swipe.phase != null}
              className={`w-16 h-auto aspect-square btn-lightbox--next flex items-center justify-center bg-highlight rounded-full text-secondary overflow-hidden xl:hover:bg-inverse transition-colors duration-300`}
            >
              <TiChevronRight className="w-14 h-auto" />
            </button>
          </div>
        )}
      </div>
      <Overlay onClose={closeLightbox} />
    </>
  );

  return createPortal(lightboxContent, document.body);
};

export default Lightbox;
