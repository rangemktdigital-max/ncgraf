export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#topo" className="flex items-center gap-2.5" aria-label="NC Copiadora — início">
      <span className="grid size-10 place-items-center rounded-xl bg-lime font-display text-xl font-extrabold leading-none text-lime-foreground">
        nc
      </span>
      {!compact && (
        <span className="leading-none">
          <span className="block font-display text-base font-extrabold tracking-tight text-brand-foreground">
            COPIADORA
          </span>
          <span className="block text-[0.6rem] font-bold tracking-[0.22em] text-lime">
            GRÁFICA · BRINDES
          </span>
        </span>
      )}
    </a>
  );
}
