'use client'

import { useFooterText } from '@/contexts/FooterTextContext'
import Image from "next/image"
import { useEffect, useState } from "react"
import girlQuiet from '../../../../public/anime-girl-silent.png'
import girlTalking from '../../../../public/anime-girl-talking.png'
import background from '../../../../public/bedroom.png'

export default function AIChat() {
  const { setFooterText, isTyping } = useFooterText()
  const [mouthOpen, setMouthOpen] = useState(false)

  useEffect(() => {
    setFooterText("Welcome to the AI assistant. I'm Claudia!")
  }, [setFooterText])

  useEffect(() => {
    if (!isTyping) {
      setMouthOpen(false)
      return
    }

    const interval = setInterval(() => {
      setMouthOpen(prev => !prev)
    }, 150)

    return () => clearInterval(interval)
  }, [isTyping])

  return (
    <div className='relative w-full h-full'>
      <Image src={background} alt="background image" className="object-cover" fill />
      <Image 
        src={girlQuiet}
        alt="AI Character"
        priority
        className={`absolute bottom-0 right-20 w-auto transition-opacity duration-0 ${mouthOpen ? 'opacity-0' : 'opacity-100'}`}
      />
      <Image 
        src={girlTalking}
        alt="AI Character talking"
        className={`absolute bottom-0 right-20 w-auto transition-opacity duration-0 ${mouthOpen ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  )
}
