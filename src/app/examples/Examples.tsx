import Link from 'next/link';

const Examples: React.FC = () => {
  return (
    <div>
      <h1>Examples page</h1>
      <ol>
        <li>
          <Link href="/examples/simple-login">Simple Login</Link>
        </li>
      </ol>
    </div>
  );
};

export default Examples;
