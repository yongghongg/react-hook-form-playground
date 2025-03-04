import { Metadata } from 'next';

export const metadata: Metadata = {
  description: 'Form Examples',
  title: 'Form Examples'
};

export default function SimpleLoginPage() {
  return (
    <main className="flex min-h-[calc(100vh-10rem)] flex-col p-24">
      <h1>Contains some sample forms that you find on the web.</h1>
      <p>Coming soon!</p>
      {/* <ol>
      <li>
        <Link href="/examples/simple-login">Simple Login</Link>
      </li>
    </ol> */}
    </main>
  );
}
