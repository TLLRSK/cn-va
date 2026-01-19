import { MediaDetails } from "@/types/types";
import { ResponsiveImage } from "../../images/ResponsiveImage";
import { useSingleProject } from "@/app/context/singleProjectContext";

const BlockTwoImages = ({
  images,
  framed,
  background_color,
}: {
  images: MediaDetails[];
  framed: boolean;
  background_color: string;
}) => {
  const { handleImageClick } = useSingleProject();
  return (
    <div
      id="two-images-block"
      style={{ backgroundColor: background_color }}
      className={`${
        framed === true
          ? "grid xl:grid-cols-12 p-sm md:p-md"
          : "grid xl:grid-cols-12 overflow-hidden"
      }`}
    >
      <div
        className={`${
          framed === true
            ? "xl:h-screen xl:col-span-8 xl:col-start-3 gap-sm md:gap-md flex flex-col xl:grid xl:grid-cols-2 items-center"
            : "flex xl:grid flex-col xl:col-span-12 xl:grid-cols-2"
        }`}
      >
        {images.map((image, i) => {
          return (
            <ResponsiveImage
              onClick={() => handleImageClick(image)}
              key={i}
              image={image}
              className={`${
                framed === true
                  ? "w-full object-contain hover:cursor-pointer"
                  : "h-full object-cover object-center hover:cursor-pointer"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BlockTwoImages;
