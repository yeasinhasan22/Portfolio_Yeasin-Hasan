import './globals.css';
import type { Metadata } from 'next';
import { Josefin_Sans } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import CustomCursor from '@/components/CustomCursor';

const josefinSans = Josefin_Sans({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const metadata: Metadata = {
  title: 'Yeasin Hasan | Software Engineer Portfolio',
  description:
    'Explore my personal portfolio — a showcase of modern web development projects, skills, and experiences.',
  icons: '/images/yeasin-hasan.png',
  metadataBase: new URL('https://yeasinhasan.vercel.app'), 

  openGraph: {
    title: 'Yeasin Hasan | Software Engineer Portfolio',
    description:
      'Explore my personal portfolio — a showcase of modern web development projects, skills, and experiences.',
    url: 'https://yeasinhasan.vercel.app',
    siteName: 'Yeasin Hasan Portfolio',
    images: [
      {
        url: 'https://yeasinhasan.vercel.app/images/preview.webp',
        width: 1200,
        height: 630,
        alt: 'Yeasin Hasan Portfolio Preview',
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Yeasin Hasan | Software Engineer Portfolio',
    description:
      'Explore my personal portfolio — a showcase of modern web development projects, skills, and experiences.',
    images: ['https://yeasinhasan.vercel.app/images/preview.webp'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={josefinSans.className}>
        <CustomCursor/>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <SonnerToaster />
        </ThemeProvider>
      </body>
    </html>
  );
}