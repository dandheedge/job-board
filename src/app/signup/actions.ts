'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  // Basic validation
  if (!name || !email || !password || !confirmPassword) {
    redirect('/signup?message=All fields are required')
  }

  if (password !== confirmPassword) {
    redirect('/signup?message=Passwords do not match')
  }

  if (password.length < 6) {
    redirect('/signup?message=Password must be at least 6 characters')
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      }
    }
  })

  if (error) {
    console.error('Signup error:', error)
    redirect('/signup?message=Error creating account. Please try again.')
  }

  revalidatePath('/', 'layout')
  redirect('/login?message=Check your email to confirm your account')
}
