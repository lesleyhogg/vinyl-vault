'use client'

import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import NavButton from './NavButton'

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
      <div className="border-2 rounded-lg py-4 pl-4 pr-5 grid grid-cols-2 gap-4 mx-10 mt-10 mb-2 text-lg font-semibold font-[family-name:var(--font-vt323)]">
        <NavButton handleOnClick={handleView} label='View' />
        <NavButton handleOnClick={handleAdd} label='Add' />
        <NavButton handleOnClick={handleAI} label='AI' />
        <NavButton handleOnClick={handleLogout} label='AI' />
      </div>
    </aside>
  )
}