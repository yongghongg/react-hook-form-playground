import { Metadata } from 'next';
import CheckoutForm from './CheckoutForm';

export const metadata: Metadata = {
  description: 'Multiple step form',
  title: 'Multiple step form'
};

export default function CheckoutFormPage() {
  return <CheckoutForm />;
}
