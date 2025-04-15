import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="flex h-12 w-full items-center justify-center border-t shadow-[0px_-1px_2px_0px_rgba(0,0,0,0.05)] md:h-14">
      <p className="text-sm text-muted-foreground">
        Built by <Link href="https://www.linkedin.com/in/yonghong-tan/">yonghong.tan</Link> with ☕️ and 💜.
      </p>
    </footer>
  );
};

export default Footer;
