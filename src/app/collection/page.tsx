'use client'

import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Collection() {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const handleAdd = async () => {
    router.push('/collection/add')
  }

  return (
    <div className='p-10'>
      <div className='mb-8'>
        <h1 className='font-semibold text-2xl mb-4'>My vinyl collection</h1>
        <div>
          <p className='mb-4'>Nothing yet!</p>
          <button onClick={handleAdd} className='rounded bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white'>Click to add</button>
        </div>
      </div>
      <button onClick={handleLogout} className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">Log Out</button>
    </div>
  )
}