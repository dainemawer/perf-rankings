import Account from '@/components/Account/Account'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Sign up to the 10up Performance Ranking Dashboard.',
}

export default function SignUpPage() {
  return (
    <main className="flex items-center justify-center w-screen h-screen">
      <Account type="signup" />
    </main>
  )
}