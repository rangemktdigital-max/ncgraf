import logoDark from "@/assets/nc-logo-dark.png";
import logo from "@/assets/nc-logo.png";
import mark from "@/assets/nc-mark.png";

export function Logo({
  variant = "dark",
  compact = false,
}: {
  variant?: "dark" | "light";
  compact?: boolean;
}) {
  const src = compact ? mark : variant === "dark" ? logoDark : logo;

  return (
    <a href="#topo" className="inline-flex items-center" aria-label="NC Copiadora — início">
      <img
        src={src}
        alt="NC Copiadora — gráfica e brindes"
        width={744}
        height={726}
        className={compact ? "h-8 w-auto" : "h-11 w-auto"}
      />
    </a>
  );
}
