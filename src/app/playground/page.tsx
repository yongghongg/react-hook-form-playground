import Playground from '@/app/playground/components/Playground';
import { Metadata } from 'next';

export const metadata: Metadata = {
  description: 'React Hook Form Playground',
  title: 'React Hook Form Playground'
};

export default function PlaygroundPage() {
  return <Playground />;
}
