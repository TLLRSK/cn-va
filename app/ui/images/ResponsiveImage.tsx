"use client";
import { MediaDetails } from "@/types/types";

type ResponsiveImageProps = {
  image: MediaDetails;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
};

export const ResponsiveImage = ({
  image,
  className = "",
  onClick,
}: ResponsiveImageProps) => {
  if (!image) return null;

  const { id, url, alt = "", sizes } = image;

  const srcSet = [
    sizes.thumbnail && `${sizes.thumbnail} 150w`,
    sizes.medium && `${sizes.medium} 300w`,
    sizes.large && `${sizes.large} 1024w`,
    sizes.full && `${sizes.full} 1920w`,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <img
      src={url}
      srcSet={srcSet}
      className={className}
      alt={alt}
      loading="lazy"
      onClick={onClick}
      onError={(e) => {
        const img = e.target as HTMLImageElement;
        if (img.src !== url) img.src = url;
      }}
    />
  );
};
