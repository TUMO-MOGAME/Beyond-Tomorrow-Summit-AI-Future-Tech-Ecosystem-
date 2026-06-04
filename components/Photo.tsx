import Image from "next/image";

/**
 * Framed photograph. Shows the image bright and high-quality by default (no
 * dimming). Pass `overlay="soft"` only when text sits on top and needs a gentle
 * bottom scrim.
 */
export default function Photo({
  src,
  alt,
  className = "",
  imgClassName = "",
  sizes = "100vw",
  priority = false,
  quality = 90,
  overlay = "none",
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  overlay?: "none" | "soft";
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={quality}
        className={`object-cover ${imgClassName}`}
      />
      {overlay === "soft" && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent" />
      )}
    </div>
  );
}
