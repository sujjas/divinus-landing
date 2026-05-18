import type { Metadata } from 'next';
import { Inter, Geist } from 'next/font/google';
import './globals.css';
import DotGridBackground from './components/DotGridBackground';
import CustomCursor from './components/CustomCursor';
import EntranceFx from './components/EntranceFx';
import SiteMenu from './components/SiteMenu';
import Footer from './components/Footer';
import AgentationDev from './components/AgentationDev';
import SmoothScroll from './components/SmoothScroll';
import WhatsAppButton from './components/WhatsAppButton';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300','400','500','600','700','800','900'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Divinus Investment Group — Capital. Intelligence. Community.',
  description:
    'A multi-division group company building the infrastructure of growth — in organisations, in markets, and in people.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)} suppressHydrationWarning>
      <body className="text-neutral-50 antialiased" style={{ backgroundColor: 'transparent' }}>
        <SmoothScroll />
        <DotGridBackground />
        <CustomCursor />
        <SiteMenu />
        {children}
        <Footer />
        <WhatsAppButton />
        <EntranceFx />
        <AgentationDev />
      </body>
    </html>
  );
}
