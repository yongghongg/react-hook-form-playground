import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Headers';
import StyledComponentsRegistry from '@/lib/registry';
import { cn } from '@/lib/utils';
import GlobalStyles from '@/styles/GlobalStyles';
import type { Metadata } from 'next';
import Head from 'next/head';
import './globals.css';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>react-hook-form examples</title>
        <meta name="description" content="react-hook-form examples" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={cn('min-h-screen bg-background font-sans antialiased')}>
        <StyledComponentsRegistry>
          <div className="relative flex flex-col bg-background">
            <Header />
            {children}
            <Footer />
          </div>
          <GlobalStyles />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
