import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container flex flex-col items-center gap-12 p-12 text-center">
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
        <p>Our interactive playground helps make it easier to get started with React Hook Form.</p>
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
  );
}
