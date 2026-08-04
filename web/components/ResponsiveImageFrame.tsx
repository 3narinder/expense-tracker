"use client";

import { useState } from "react";
import Image from "next/image";

type ResponsiveImageFrameProps = {
  src: string;
  alt: string;
  aspectClassName?: string;
  wrapperClassName?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
};

export default function ResponsiveImageFrame({
  src,
  alt,
  aspectClassName = "aspect-[4/3]",
  wrapperClassName = "",
  imageClassName = "",
  priority = false,
  sizes,
}: ResponsiveImageFrameProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={`relative overflow-hidden ${aspectClassName} ${wrapperClassName}`}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-(--color-bg-muted) animate-pulse" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "(max-width: 1024px) 100vw, 50vw"}
        priority={priority}
        className={`object-contain object-center transition-opacity duration-500 ease-out ${
          isLoading ? "opacity-0" : "opacity-100"
        } ${imageClassName}`}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </div>
  );
}
