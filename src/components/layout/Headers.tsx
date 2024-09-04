import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { Shapes } from 'lucide-react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <div className="flex gap-6">
          <Link href="/" className="flex gap-1">
            <Shapes />
            <span>rhfe</span>
          </Link>
          <Link href="/examples">Examples</Link>
        </div>
        <Link href="https://github.com/yongghongg" target="_blank">
          <GitHubLogoIcon />
          <span className="sr-only">Github Logo</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
