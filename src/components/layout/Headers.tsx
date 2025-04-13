import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { Shapes } from 'lucide-react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <div className="flex gap-8">
          <Link href="/" className="flex gap-1">
            <Shapes />
            <span>RHF Playground</span>
          </Link>
          <Link className="hover:underline hover:underline-offset-4" href="/playground">
            Playground
          </Link>
          <Link className="hover:underline hover:underline-offset-4" href="/examples">
            Examples
          </Link>
        </div>
        <Link href="https://github.com/yongghongg" target="_blank">
          <GitHubLogoIcon height={20} width={20} />
          <span className="sr-only">Github Logo</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
