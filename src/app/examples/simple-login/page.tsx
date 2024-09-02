import SimpleLogin from "./SimpleLogin";
import { Metadata } from "next";

export const metadata: Metadata = {
    description: 'Simple login',
    title: 'Simple Login'
  };

export default function SimpleLoginPage() {
    return <SimpleLogin />
}
