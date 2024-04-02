import Account from '@/components/Account/Account'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to the 10up Performance Ranking Dashboard.',
}

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center w-screen h-screen">
      <Account type="login" />
    </main>
  )
}