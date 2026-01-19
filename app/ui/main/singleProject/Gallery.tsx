"use client";

import { TransformedProjectGalleryBlock } from "@/types/types";

import { useSingleProject } from "@/app/context/singleProjectContext";
import Lightbox from "../../lightbox/Lightbox";
import BlockSingleImage from "./BlockSingleImage";
import BlockTwoImages from "./BlockTwoImages";
import BlockAsimetric from "./BlockAsimetric";
import BlockGrid from "./BlockGrid";

const Gallery = () => {
  const { gallery, clickedIndex, lightboxOpen } = useSingleProject();

  return (
    <>
      <div id="project-gallery" className="flex flex-col">
        {gallery.map((item: TransformedProjectGalleryBlock, i: number) => {
          const { block_type } = item;

          switch (block_type) {
            case "Single Image":
              return (
                <BlockSingleImage
                  key={i}
                  image={item.image}
                  display={item.display}
                  background_color={item.background_color}
                />
              );
            case "Two Images":
              return (
                <BlockTwoImages
                  key={i}
                  images={item.images}
                  framed={item.framed}
                  background_color={item.background_color}
                />
              );
            case "Grid":
              return (
                <BlockGrid
                  key={i}
                  images={item.images}
                  columns={item.columns}
                  background_color={item.background_color}
                />
              );
            case "Asimetric":
              return (
                <BlockAsimetric
                  key={i}
                  images={item.images}
                  framed_image={item.framed_image}
                  background_color={item.background_color}
                />
              );
          }
        })}
      </div>

      {clickedIndex !== null && lightboxOpen && (
        <Lightbox initialIndex={clickedIndex} />
      )}
    </>
  );
};

export default Gallery;
