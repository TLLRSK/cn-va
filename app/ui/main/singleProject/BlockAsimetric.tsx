import { AsimetricFrame, MediaDetails } from "@/types/types";
import { ResponsiveImage } from "../../images/ResponsiveImage";
import { useSingleProject } from "@/app/context/singleProjectContext";

const BlockAsimetric = ({
  images,
  framed_image,
  background_color,
}: {
  images: MediaDetails[];
  framed_image: AsimetricFrame;
  background_color: string;
}) => {
  
  const cellClass = (framed: string) => {
    return framed === framed_image
      ? "flex-1 grid grid-cols-12 items-center justify-center py-sm"
      : "flex-1 flex overflow-hidden";
  };

  const imageClass = (framed: string) => {
    return framed === framed_image
      ? "w-auto max-h-[80%] col-span-8 col-start-3 object-contain mx-auto hover:cursor-pointer"
      : "flex-1 object-cover object-center hover:cursor-pointer";
  };

  const { handleImageClick } = useSingleProject();


  return (
    <div
      id="image-asimetric-block"
      style={{ backgroundColor: background_color }}
      className="h-screen flex flex-col md:flex-row"
    >
      <div className={cellClass("First")}>
        <ResponsiveImage
          onClick={() => handleImageClick(images[0])}
          image={images[0]}
          className={imageClass("First")}
        />
      </div>

      <div className={cellClass("Last")}>
        <ResponsiveImage
          onClick={() => handleImageClick(images[1])}
          image={images[1]}
          className={imageClass("Last")}
        />
      </div>
    </div>
  );
};

export default BlockAsimetric;
