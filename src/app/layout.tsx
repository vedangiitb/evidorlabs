import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Evidor — The most powerful LLM harness',
  description:
    'Evidor is a provider-agnostic foundation for building reliable LLM applications and autonomous AI systems. One interface. Multiple providers. Context management built in.',
  keywords: [
    'LLM harness',
    'AI agent',
    'OpenAI',
    'Anthropic Claude',
    'Google Gemini',
    'Python LLM library',
    'context window management',
    'automatic compaction',
    'evidor',
  ],
  authors: [{ name: 'Vedang Bale' }],
  openGraph: {
    title: 'Evidor — The most powerful LLM harness',
    description:
      'A provider-agnostic foundation for building reliable LLM applications and autonomous AI systems. One interface. Multiple providers. Context management built in.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Evidor',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Evidor — The most powerful LLM harness',
    description:
      'Provider-agnostic foundation for building reliable LLM applications and autonomous AI systems.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#07080b] text-slate-200 antialiased flex flex-col justify-between selection:bg-sky-500/20 selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

