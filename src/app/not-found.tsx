import Image from 'next/image';

const NotFoundPage: React.FC = () => {
  return (
    <>
      <h1 className="my-8 text-3xl">Page not found</h1>
      <div>
        <Image src="/confused-travolta.gif" alt="confused person image" width="768" height="326" />
      </div>
    </>
  );
};
export default NotFoundPage;
