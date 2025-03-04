import Playground from '@/app/playground/Playground';
import { Metadata } from 'next';

export const metadata: Metadata = {
  description: 'Form Examples',
  title: 'Form Examples'
};

export default function PlaygroundPage() {
  return <Playground />;
}
