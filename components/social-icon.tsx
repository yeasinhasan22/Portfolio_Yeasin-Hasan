import { Github, Linkedin, Instagram, Facebook } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { SocialIcon as SocialIconKey } from "@/lib/content";

/* One place to resolve a social's `icon` key to its glyph, so the nav,
   the hero and the contact section can never drift apart. */
const GLYPHS: Record<SocialIconKey, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
};

export default function SocialIcon({
  name,
  className,
}: {
  name: SocialIconKey;
  className?: string;
}) {
  const Glyph = GLYPHS[name];
  return <Glyph className={className} aria-hidden strokeWidth={1.8} />;
}
