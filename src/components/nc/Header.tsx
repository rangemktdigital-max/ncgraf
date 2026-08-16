import { useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import { wa } from "@/lib/nc";

const links = [
  { href: "#produtos", label: "Produtos" },
  { href: "#como-comprar", label: "Como comprar" },
  { href: "#localizacao", label: "Localização" },
  { href: "#contato", label: "Fale conosco" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 surface-brand shadow-card">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Logo />

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-display text-sm font-bold uppercase tracking-wide text-brand-foreground/85 transition-colors hover:text-lime"
            >
              {l.label}
            </a>
          ))}
          <a
            href={wa("Olá, vim pelo site (menu) e quero um orçamento")}
            target="_blank"
            rel="noopener"
            className="btn-lime !px-5 !py-2 text-sm"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            WhatsApp
          </a>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <a
            href={wa("Olá, vim pelo site (topo) e quero um orçamento")}
            target="_blank"
            rel="noopener"
            aria-label="Falar no WhatsApp"
            className="grid size-10 place-items-center rounded-full bg-lime text-lime-foreground"
          >
            <MessageCircle className="size-5" aria-hidden="true" />
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            className="grid size-10 place-items-center rounded-full border border-brand-foreground/25 text-brand-foreground"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-brand-foreground/10 px-4 pb-4 pt-2 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-brand-foreground/10 py-3 font-display font-bold uppercase tracking-wide text-brand-foreground/90"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
