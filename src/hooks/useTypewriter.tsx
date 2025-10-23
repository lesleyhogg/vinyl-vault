import { useEffect, useState } from "react";

export default function useTypewriter(text?: string, speed?: number) {
  const [typedText, setTypedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    setTypedText('')
    setCurrentIndex(0)
    setIsTyping(true)
  }, [text])

  useEffect(() => {
    if (text && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setTypedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    } else if (text && currentIndex >= text.length) {
      setIsTyping(false)
    }
  }, [currentIndex, text, speed])

  return [typedText, isTyping] as const
}