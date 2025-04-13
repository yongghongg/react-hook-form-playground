import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Headers';
import StyledComponentsRegistry from '@/lib/registry';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import Head from 'next/head';
import './globals.css';

export const metadata: Metadata = {
  title: 'React Hook Form Playground',
  description: 'An interactive playground to help you get started with React Hook Form.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>react-hook-form playground</title>
        <meta name="description" content="react-hook-form examples" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={cn('flex min-h-screen flex-col items-center bg-background font-sans antialiased')}>
        <StyledComponentsRegistry>
          <Header />
          <main className="w-full max-w-screen-2xl grow">{children}</main>
          <Footer />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
