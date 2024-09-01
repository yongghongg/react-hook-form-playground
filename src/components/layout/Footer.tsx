import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by <Link href="https://www.linkedin.com/in/yonghong-tan/">yonghong.tan</Link>. The source code is
          available on <Link href="https://github.com/yongghongg">GitHub</Link>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
