import kriaLogo from "@/assets/kria-logo.png.asset.json";

type Variant = "default" | "onDark";
type Size = "sm" | "md" | "lg";

const SIZE_CLS: Record<Size, string> = {
  sm: "h-7 md:h-8",
  md: "h-9 md:h-10",
  lg: "h-12 md:h-14",
};

type Props = {
  size?: Size;
  variant?: Variant;
  className?: string;
};

export default function BrandLogo({ size = "md", variant = "default", className = "" }: Props) {
  // Em fundos escuros, força o wordmark a aparecer em branco preservando o "K" laranja
  // via filtros (a logo é PNG transparente com o wordmark em roxo).
  const dark = variant === "onDark";
  return (
    <img
      src={kriaLogo.url}
      alt="Kria AI"
      loading="eager"
      decoding="async"
      className={`${SIZE_CLS[size]} w-auto select-none ${dark ? "brightness-0 invert" : ""} ${className}`}
    />
  );
}
