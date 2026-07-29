import Image from "next/image";
import type { ComponentProps } from "react";

type ResponsiveImageFrameProps = {
  src: string;
  alt: string;
  aspectClassName?: string;
  wrapperClassName?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
} & Omit<ComponentProps<typeof Image>, "src" | "alt" | "fill" | "sizes">;

export default function ResponsiveImageFrame({
  src,
  alt,
  aspectClassName = "aspect-[4/3]",
  wrapperClassName = "",
  imageClassName = "",
  priority = false,
  sizes,
  ...imageProps
}: ResponsiveImageFrameProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[1.5rem] border border-(--color-border-main)/70 bg-(--color-bg-surface) shadow-[0_30px_80px_-45px_rgba(15,23,42,0.35)] ${wrapperClassName}`}
    >
      <div
        className={`relative overflow-hidden rounded-[1.25rem] bg-(--color-bg-app) ${aspectClassName}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? "(max-width: 1024px) 100vw, 50vw"}
          priority={priority}
          className={`object-contain object-center transition-transform duration-500 group-hover:scale-[1.01] ${imageClassName}`}
          {...imageProps}
        />
      </div>
    </div>
  );
}
