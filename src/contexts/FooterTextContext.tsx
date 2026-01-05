'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

interface FooterTextContextType {
  footerText: string
  setFooterText: (text: string) => void
  isTyping: boolean
  setIsTyping: (typing: boolean) => void
  enableFooterInput: boolean
  setEnableFooterInput: (enableInput: boolean) => void
}

const FooterTextContext = createContext<FooterTextContextType | undefined>(undefined)

export function FooterTextProvider({ children }: { children: ReactNode }) {
  const [footerText, setFooterText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [enableFooterInput, setEnableFooterInput] = useState(false)
  
  return (
    <FooterTextContext.Provider value={{ footerText, setFooterText, isTyping, setIsTyping, enableFooterInput, setEnableFooterInput }}>
      {children}
    </FooterTextContext.Provider>
  )
}

export function useFooterText() {
  const context = useContext(FooterTextContext)
  if (!context) throw new Error('useFooterText must be used within FooterTextProvider')
  return context
}
