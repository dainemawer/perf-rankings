'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(data: { email: string, password: string }) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const fields = {
    email: data.email as string,
    password: data.password as string,
  }

  const { error } = await supabase.auth.signInWithPassword(fields)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(data: { email: string, password: string }) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const fields = {
    email: data.email as string,
    password: data.password as string,
  }

  const { error } = await supabase.auth.signUp(fields)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}