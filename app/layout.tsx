import Head from "next/head";
import './globals.css';
import type { Metadata } from 'next';
import { Josefin_Sans } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import CustomCursor from '@/components/CustomCursor';

const josefinSans = Josefin_Sans({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const metadata: Metadata = {
  title: 'Yeasin Hasan | Software Engineer',
  description: 'Portfolio of Yeasin Hasan, a passionate Software Engineer specializing in web development and interactive experiences.',
  icons:'/images/yeasin-hasan.png'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <title>Yeasin Hasan | Full-Stack Developer Portfolio</title>
        <meta name="description" content="I'm a full-stack developer building modern, fast, and responsive web applications with MERN & Next.js." />

        <meta property="og:title" content="Yeasin Hasan | Software Engineer Portfolio" />
        <meta property="og:description" content="Explore my personal portfolio — a showcase of modern web development projects, skills, and experiences." />
        <meta property="og:image" content="/images/preview.webp" />
        <meta property="og:url" content="https://yeasinhasan.vercel.app/" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Yeasin Hasan | Software Engineer Portfolio" />
        <meta name="twitter:description" content="Explore my personal portfolio — a showcase of modern web development projects, skills, and experiences." />
        <meta name="twitter:image" content="/images/preview.webp" />
      </Head>
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