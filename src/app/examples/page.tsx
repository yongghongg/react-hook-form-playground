import Examples from '@/app/examples/Examples';
import { Metadata } from 'next';

export const metadata: Metadata = {
  description: 'Form Examples',
  title: 'Form Examples'
};

export default function SimpleLoginPage() {
  return <Examples />;
}
