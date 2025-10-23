'use client'

import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LayoutRight() {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const handleAdd = async () => {
    router.push('/add')
  }

  const handleView = async () => {
    router.push('/collection')
  }

  const handleAI = async () => {
    router.push('/ai')
  }

  return (
    <aside className="overflow-y-auto px-4 pb-4 flex flex-col gap-4 bg-green-200">
      <div className="border-4 rounded-lg border-gray-700 w-full h-full">
        <div className="border rounded-lg border-gray-300 w-full h-full">
          <div className="rounded bg-gray-900 text-green-100 p-8 w-full h-full">
            Player stats go here
          </div>
        </div>
      </div>
      <div className="border-2 rounded-lg p-4 grid grid-cols-2 gap-4 mx-10 mt-10 mb-2">
        <button onClick={handleView} className="px-6 py-4 rounded-lg border-2 w-full text-center">View</button>
        <button onClick={handleAdd} className="px-6 py-4 rounded-lg border-2 w-full text-center">Add</button>
        <button onClick={handleAI} className="px-6 py-4 rounded-lg border-2 w-full text-center">AI</button>
        <button onClick={handleLogout}className="px-6 py-4 rounded-lg border-2 w-full text-center">Logout</button>
      </div>
    </aside>
  )
}