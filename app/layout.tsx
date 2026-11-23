import './globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono, Caveat, Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import CustomCursor from '@/components/CustomCursor';

/* Grotesk for display, Inter for body, mono for labels, Caveat for the
   handwritten annotations that give the paper layer its personality. */
/* All four are variable fonts, so no `weight` is passed: requesting explicit
   weights makes next/font fetch per-weight CSS from Google, and that fetch
   returning anything unexpected fails the production build outright. */
const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const hand = Caveat({
  subsets: ['latin'],
  variable: '--font-hand',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Yeasin Hasan | Software Engineer',
  description:
    'Full-Stack Software Engineer in Dhaka: Next.js, React and the MERN stack. Design to deployment, including a voting platform that served 100K+ live users.',
  icons: '/images/yeasin-hasan.png',
  metadataBase: new URL('https://yeasinhasan.vercel.app'),
  // Next 13 still takes themeColor on `metadata` (the `viewport` export landed in 14).
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F5F2EA' },
    { media: '(prefers-color-scheme: dark)', color: '#131210' },
  ],
  keywords: [
    'Yeasin Hasan',
    'Software Engineer',
    'Full-Stack Developer',
    'Next.js',
    'React',
    'MERN Stack',
    'Dhaka',
    'Bangladesh',
  ],
  openGraph: {
    title: 'Yeasin Hasan | Software Engineer',
    description:
      'Full-Stack Software Engineer: Next.js, React and the MERN stack. Design to deployment.',
    url: 'https://yeasinhasan.vercel.app',
    siteName: 'Yeasin Hasan',
    // Relative paths resolve against `metadataBase` above.
    images: [
      {
        url: '/images/preview.jpg',
        width: 1919,
        height: 951,
        type: 'image/jpeg',
        alt: 'Yeasin Hasan, Software Engineer',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yeasin Hasan | Software Engineer',
    description:
      'Full-Stack Software Engineer: Next.js, React and the MERN stack.',
    images: ['/images/preview.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable} ${hand.variable}`}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <CustomCursor />
          {children}
          <Toaster />
          <SonnerToaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
