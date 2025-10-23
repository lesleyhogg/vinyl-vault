'use client'

import { useFooterText } from "@/contexts/FooterTextContext"
import { useEffect } from "react"

export default function Collection() {
  const { setFooterText } = useFooterText()
  
  useEffect(() => {
    setFooterText("Welcome back! Testing this thing out! What would you like to do?")
  }, [setFooterText])

  return (
    <div className='p-10'>
      <div className='mb-8'>
        <h1 className='font-semibold text-2xl mb-4'>My vinyl collection</h1>
        <p className='mb-4'>Nothing yet!</p>
      </div>
    </div>
  )
}