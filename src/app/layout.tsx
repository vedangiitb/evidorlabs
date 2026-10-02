import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Evidor — Provider-Agnostic Runtime for Building AI Agents',
  description:
    'Evidor is an open-source, provider-agnostic runtime for building AI agents across OpenAI, Anthropic, and Gemini with built-in context window management and autonomous tool execution.',
  keywords: [
    'AI agent runtime',
    'LLM harness',
    'AI agent',
    'OpenAI',
    'Anthropic Claude',
    'Google Gemini',
    'Python LLM library',
    'context window management',
    'automatic compaction',
    'function calling',
    'evidor',
  ],
  authors: [{ name: 'Vedang Bale' }],
  openGraph: {
    title: 'Evidor — Provider-Agnostic Runtime for Building AI Agents',
    description:
      'Open-source, provider-agnostic runtime for building AI agents with built-in context compaction, native async, and autonomous tool calling.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Evidor',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Evidor — Provider-Agnostic Runtime for Building AI Agents',
    description:
      'Open-source, provider-agnostic runtime for building AI agents with built-in context compaction and tool loops.',
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
      <body className="min-h-screen bg-black text-zinc-200 antialiased flex flex-col justify-between selection:bg-white selection:text-black">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
