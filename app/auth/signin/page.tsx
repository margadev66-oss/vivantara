'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignIn() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.ok) {
      router.push('/admin')
      router.refresh()
    } else {
      alert('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas">
      <form onSubmit={handleSubmit} className="bg-white p-8 border border-warmth/20 shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-serif text-thought mb-6">Vivartana Admin</h1>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-thought mb-2">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-warmth/30 focus:border-thought outline-none"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-thought mb-2">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-warmth/30 focus:border-thought outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-thought text-white py-2 font-medium hover:bg-thought/90 transition-colors"
        >
          Sign In
        </button>
      </form>
    </div>
  )
}
