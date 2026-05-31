import Image from "next/image";

/**
 * Framed photograph. The UI is pure monochrome; the people are what carry
 * warmth — so photos appear in full color inside a hairline frame, with a
 * bottom-up black gradient that ties them into the black theme and keeps any
 * overlaid text legible.
 */
export default function Photo({
  src,
  alt,
  className = "",
  imgClassName = "",
  sizes = "100vw",
  priority = false,
  overlay = "bottom",
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  overlay?: "bottom" | "full" | "none";
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${imgClassName}`}
      />
      {overlay === "bottom" && (
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
      )}
      {overlay === "full" && (
        <div className="absolute inset-0 bg-ink/45" />
      )}
    </div>
  );
}
