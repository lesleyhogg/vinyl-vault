'use client'

import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const supabase = createClient()
  const isDisabled = email.length === 0 || password.length === 0

  const handleSignUp = async () => {
    await supabase.auth.signUp({ email, password })
    alert('Check your email for confirmation!')
  }

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (!error) router.push('/collection')
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-4 p-8">
        <h1 className="text-2xl font-bold">Vinyl Vault</h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full rounded border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex gap-2">
          <button onClick={handleSignIn} disabled={isDisabled} className={`rounded ${isDisabled ? 'bg-blue-100' : 'bg-blue-500'} px-4 py-2 text-white`}>
            Sign In
          </button>
          <button onClick={handleSignUp} disabled={isDisabled} className={`rounded ${isDisabled ? 'bg-green-100' : 'bg-green-500'} px-4 py-2 text-white`}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  )
}
