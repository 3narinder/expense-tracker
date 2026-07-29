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
  const previewMetadata = [src, alt, imageClassName, priority ? "priority" : "", sizes ?? ""]
    .filter(Boolean)
    .join(" | ");

  return (
    <div className={`group relative overflow-hidden rounded-[2rem] ${wrapperClassName}`}>
      <div
        className={`relative overflow-hidden rounded-[1.4rem] bg-(--color-bg-subtle) ${aspectClassName}`}
      >
        <div className="sr-only">{previewMetadata}</div>
        <div className="absolute inset-0 animate-pulse bg-linear-to-br from-(--color-bg-muted) via-(--color-bg-surface) to-(--color-bg-muted)" />
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <div className="rounded-full border border-(--color-border-main)/70 bg-(--color-bg-surface)/90 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-(--color-text-muted) shadow-sm">
            Preview image
          </div>
        </div>
        {/* Uncomment once the image is placed in /public and its aspect ratio is confirmed:
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? "(max-width: 1024px) 100vw, 50vw"}
          priority={priority}
          className={`object-contain object-center ${imageClassName}`}
        />
        */}
      </div>
    </div>
  );
}
