import { MediaDetails } from "@/types/types";
import { ResponsiveImage } from "../../images/ResponsiveImage";
import { useSingleProject } from "@/app/context/singleProjectContext";

const BlockGrid = ({
  images,
  columns,
  background_color,
}: {
  images: MediaDetails[];
  columns: string;
  background_color: string;
}) => {
  const { handleImageClick } = useSingleProject();
  return (
    <div
      style={{ backgroundColor: background_color }}
      className={
        columns === "2"
          ? "grid md:grid-cols-2"
          : "grid md:grid-cols-3"
      }
    >
      {images.map((image, i) => {
        return (
          <ResponsiveImage
            key={i}
            image={image}
            onClick={() => handleImageClick(image)}
            className="w-full h-full hover:cursor-pointer"
          />
        );
      })}
    </div>
  );
};

export default BlockGrid;
