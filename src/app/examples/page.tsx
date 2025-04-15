import { Metadata } from 'next';

export const metadata: Metadata = {
  description: 'Form Examples',
  title: 'Form Examples'
};

export default function SimpleLoginPage() {
  return (
    <div className="container py-8 text-center">
      <h1>Contains examples of some of the common forms that you find on the web.</h1>
      <p>Coming soon!</p>
    </div>
  );
}
