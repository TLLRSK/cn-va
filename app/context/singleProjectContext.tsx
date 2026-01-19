"use client";
import {
  ISingleProjectContext,
  MediaDetails,
  TransformedSingleProjectData,
} from "@/types/types";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

const SingleProjectContext = createContext<ISingleProjectContext | undefined>(
  undefined
);

export const SingleProjectProvider = ({
  children,
  projectData,
}: {
  children: ReactNode;
  projectData: TransformedSingleProjectData;
}) => {
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  const handleImageClick = useCallback((image: MediaDetails) => {
    const selectedImg = imagesArr.findIndex(
      (img) => img.id === image.id
    );
    setClickedIndex(selectedImg);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const {
    id,
    slug,
    title,
    main_image,
    content,
    imagesArr,
    gallery,
    project_details,
    description_colors,
    link,
  } = projectData;
  const value = {
    id,
    slug,
    title,
    main_image,
    content,
    imagesArr,
    gallery,
    project_details,
    description_colors,
    link,
    lightboxOpen,
    clickedIndex,
    closeLightbox,
    handleImageClick,
  };
  return (
    <SingleProjectContext.Provider value={value}>
      {children}
    </SingleProjectContext.Provider>
  );
};

export const useSingleProject = () => {
  const ctx = useContext(SingleProjectContext);
  if (!ctx)
    throw new Error(
      "useSingleProject must be used within a SingleProjectProvider"
    );
  return ctx;
};
