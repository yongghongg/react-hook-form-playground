import Image from 'next/image';

const NotFoundPage: React.FC = () => {
  return (
    <main className="container mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-xl flex-col items-center">
      <h1 className="my-32 text-2xl">Page not found</h1>
      <div>
        <Image src="/confused-travolta.gif" alt="confused person image" width="768" height="326" />
      </div>
    </main>
  );
};
export default NotFoundPage;
