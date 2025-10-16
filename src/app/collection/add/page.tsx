'use client'

import { useRouter } from 'next/navigation'

export default function AddRecord() {
  const router = useRouter()

  const handleBack = async () => {
    router.back()
  }

  return (
    <div className='p-10'>
      <button onClick={handleBack} className='rounded bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white'>Back to collection</button>
    </div>
  )
}