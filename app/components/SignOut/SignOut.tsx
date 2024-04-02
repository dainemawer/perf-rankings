"use client";

import { createClient } from '@/utils/supabase/client'

const SignOut = () => {
  const supabase = createClient()

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      window.location.href = '/'
    }
  }

  return (
    <button onClick={handleSignOut} className="text-xs" type="button">Sign out</button>
  )
}

export default SignOut