import { Metadata } from 'next';
import SimpleLogin from './SimpleLogin';

export const metadata: Metadata = {
  description: 'Simple login',
  title: 'Simple Login'
};

export default function SimpleLoginPage() {
  return <SimpleLogin />;
}
