import { MediaDetails, SingleImageDisplay } from "@/types/types";
import { ResponsiveImage } from "../../images/ResponsiveImage";
import { useSingleProject } from "@/app/context/singleProjectContext";

const BlockSingleImage = ({
  image,
  display,
  background_color,
}: {
  image: MediaDetails;
  display: SingleImageDisplay;
  background_color: string;
}) => {
  const { handleImageClick } = useSingleProject();
  return (
    <div
      id="image-single-block"
      className={display === "Screen width" ? "flex" : "xl:h-screen flex items-center justify-center"}
      style={{ backgroundColor: background_color }}
    >
      <ResponsiveImage
        onClick={() => handleImageClick(image)}
        image={image}
        className={display === "Screen width" ? "w-full object-contain hover:cursor-pointer" : "w-full max-h-[85%] object-contain hover:cursor-pointer"}
      />
    </div>
  );
};

export default BlockSingleImage;
