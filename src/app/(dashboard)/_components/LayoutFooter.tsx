'use client'

import useTypewriter from "@/hooks/useTypewriter"

export interface LayoutFooterProps {
  displayText: string
}

export default function LayoutFooter({displayText}: LayoutFooterProps) {
  const typedText = useTypewriter(displayText, 50)

  return (
    <footer className="col-span-3 bg-green-200 w-full py-4">
      <div className="border-4 rounded-lg border-gray-700 w-full h-full">
        <div className="border rounded-lg border-gray-300 w-full h-full">
          <div className="rounded bg-gray-900 text-green-100 p-8 w-full h-[200px]">
            <p className="font-[family-name:var(--font-press-start)] text-xl">
              {typedText}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}