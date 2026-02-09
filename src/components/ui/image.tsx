import { useState } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getResponsiveImageUrl,
  type ApiImage,
  type ImageSize,
} from "@/lib/utils/imageUtils";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  wrapperClassName?: string;
  apiImage?: ApiImage | null;
  preferredSize?: ImageSize;
}

export function Image({
  className,
  wrapperClassName,
  src,
  alt,
  apiImage,
  preferredSize = "medium",
  ...props
}: ImageProps) {
  // Determine the actual src: prefer apiImage if provided, otherwise use src prop
  const resolvedSrc = apiImage
    ? getResponsiveImageUrl(apiImage, preferredSize)
    : src;

  const [isLoading, setIsLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(resolvedSrc);

  if (currentSrc !== resolvedSrc) {
    setCurrentSrc(resolvedSrc);
    setIsLoading(true);
  }

  return (
    <div className={cn("relative overflow-hidden", wrapperClassName)}>
      {isLoading && (
        <Skeleton
          className={cn("h-full w-full absolute inset-0 z-10", className)}
        />
      )}
      <img
        src={resolvedSrc}
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className,
        )}
        onLoad={() => setIsLoading(false)}
        {...props}
      />
    </div>
  );
}
