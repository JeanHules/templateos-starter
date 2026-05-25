import { useState } from "react";

interface NavLink { label: string; href: string }

interface NavBarProps {
  logo?: string;
  links?: NavLink[];
  cta?: string;
}

function NavBar({ logo = "Acme", links = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Blog", href: "#blog" },
  { label: "About", href: "#about" },
], cta = "Get started" }: NavBarProps) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-stone-200">
      <nav className="mx-auto max-w-6xl px-5 flex h-16 items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 font-bold text-stone-900">
          <div className="w-8 h-8 bg-amber-500 rounded-xl flex items-center justify-center text-white text-sm font-bold">
            {logo[0]}
          </div>
          {logo}
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="h-9 px-4 inline-flex items-center text-sm text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-2">
          <a href="#" className="h-9 px-4 text-sm text-stone-600 hover:text-stone-900 transition-colors">
            Sign in
          </a>
          <a
            href="#"
            className="h-9 px-4 bg-amber-500 text-white text-sm font-medium rounded-full hover:bg-amber-600 transition-colors inline-flex items-center"
          >
            {cta}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
        >
          {open ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-stone-200 bg-white px-5 py-4 space-y-1">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="block px-3 py-2 text-sm text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
            >
              {l.label}
            </a>
          ))}
          <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
            <a href="#" className="block px-3 py-2 text-sm text-stone-700">Sign in</a>
            <a href="#" className="block px-3 py-2 bg-amber-500 text-white text-sm font-medium rounded-full text-center hover:bg-amber-600 transition-colors">
              {cta}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default function NavBarDemo() {
  return (
    <div className="bg-stone-50 min-h-[200px]">
      <NavBar />
      <div className="mx-auto max-w-6xl px-5 py-10 text-sm text-stone-400 text-center">
        Page content sits here
      </div>
    </div>
  );
}
