import { redirect } from 'next/navigation'

export default function Home() {
  return (
    <div className="">Home Page
      {
        redirect('/login')
      }</div>
  );
}
