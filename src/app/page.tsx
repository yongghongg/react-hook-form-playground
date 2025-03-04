import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-10rem)] flex-col p-24">
      <div className="flex flex-col items-center gap-12 text-center">
        <h1 className="text-5xl font-semibold">React Hook Form Playground</h1>
        <div className="flex flex-col gap-2 text-2xl">
          <p>Forms are hard.</p>
          <p>
            <Button variant="link" asChild className="p-0 text-2xl">
              <Link href="https://react-hook-form.com/">
                React Hook Form <ExternalLink />
              </Link>
            </Button>{' '}
            makes dealing with forms easier.
          </p>
          <p>The playground helps start using React Hook Form easier.</p>
        </div>
        <div>
          <Button size="xl" className="text-xl [&_svg]:size-6" asChild>
            <Link href="/playground">
              Start playing
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
