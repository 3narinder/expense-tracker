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
  return (
    <div
      className={`relative overflow-hidden ${aspectClassName} ${wrapperClassName}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "(max-width: 1024px) 100vw, 50vw"}
        priority={priority}
        className={`object-contain object-center ${imageClassName}`}
      />
    </div>
  );
}
