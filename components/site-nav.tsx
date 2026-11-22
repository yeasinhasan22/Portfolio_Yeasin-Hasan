"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, Heart } from "lucide-react";
import { nav, socials, profile } from "@/lib/content";
import { Magnetic } from "@/components/primitives";
import SocialIcon from "@/components/social-icon";
import ThemeToggle from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export default function SiteNav() {
  const [active, setActive] = useState<string>("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  /* Scroll-spy by position, not IntersectionObserver: the pinned work
     section is several viewports tall, so intersection *ratios* stay tiny
     and never cross a useful threshold. Instead, ask which section owns the
     line one third down the viewport. */
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const line = window.scrollY + window.innerHeight * 0.34;
      let current: string = nav[0].id;

      for (const item of nav) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= line) current = item.id;
      }

      // Anything within a viewport of the bottom counts as the last section.
      if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 80
      ) {
        current = nav[nav.length - 1].id;
      }

      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll while the mobile sheet is open. */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* reading progress hairline */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-ink"
      />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-spring",
          scrolled ? "py-2.5" : "py-5"
        )}
      >
        <div className="mx-auto w-[min(1180px,94vw)]">
          <nav
            className={cn(
              "flex items-center justify-between gap-3 rounded-full border px-3 py-2 transition-all duration-500 ease-spring",
              scrolled
                ? "border-ink/10 bg-paper-raised/85 shadow-paper backdrop-blur-xl"
                : "border-transparent bg-transparent"
            )}
          >
            {/* brand */}
            <button
              onClick={() => go("home")}
              className="group flex shrink-0 items-center gap-2 rounded-full px-2 py-1"
              aria-label="Back to top"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-paper transition-transform duration-300 group-hover:rotate-[14deg]">
                <span className="font-display text-sm font-bold">Y</span>
              </span>
              <span className="font-hand text-xl leading-none text-ink">
                {profile.firstName.toLowerCase()}
              </span>
            </button>

            {/* desktop links */}
            <ul className="hidden items-center gap-1 md:flex">
              {nav.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => go(item.id)}
                      className={cn(
                        "relative rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-300",
                        isActive ? "text-ink" : "text-ink-faint hover:text-ink"
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-lime"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* right cluster */}
            <div className="flex items-center gap-1.5">
              <div className="hidden items-center gap-1 sm:flex">
                {socials.map((s) => (
                  <Magnetic key={s.label} strength={0.4}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      title={s.label}
                      className="grid h-8 w-8 place-items-center rounded-full border border-ink/12 text-ink-soft transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper"
                    >
                      <SocialIcon name={s.icon} className="h-[15px] w-[15px]" />
                    </a>
                  </Magnetic>
                ))}
              </div>

              <ThemeToggle />

              <Magnetic strength={0.3} className="hidden sm:inline-block">
                <button
                  onClick={() => go("contact")}
                  className="flex items-center gap-1.5 rounded-full border-2 border-ink bg-paper-raised px-4 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
                >
                  <Heart className="h-3 w-3" />
                  Contact
                </button>
              </Magnetic>

              <button
                onClick={() => setOpen((v) => !v)}
                className="grid h-9 w-9 place-items-center rounded-full border border-ink/12 md:hidden"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
              >
                {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-paper/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex h-full flex-col justify-center gap-1 px-8">
              {nav.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.1, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => go(item.id)}
                  className="border-b border-ink/10 py-4 text-left font-display text-4xl font-bold tracking-tight text-ink"
                >
                  <span className="mr-3 font-mono text-xs text-ink-faint">
                    0{i + 1}
                  </span>
                  {item.label}
                </motion.button>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="mt-8 flex flex-wrap gap-2"
              >
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em]"
                  >
                    <SocialIcon name={s.icon} className="h-3.5 w-3.5" />
                    {s.label}
                  </a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
