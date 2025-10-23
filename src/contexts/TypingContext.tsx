'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

interface TypingContextType {
  isTyping: boolean
  setIsTyping: (typing: boolean) => void
}

const TypingContext = createContext<TypingContextType | undefined>(undefined)

export function TypingProvider({ children }: { children: ReactNode }) {
  const [isTyping, setIsTyping] = useState(false)
  
  return (
    <TypingContext.Provider value={{ isTyping, setIsTyping }}>
      {children}
    </TypingContext.Provider>
  )
}

export function useTyping() {
  const context = useContext(TypingContext)
  if (!context) throw new Error('useTyping must be used within TypingProvider')
  return context
}
