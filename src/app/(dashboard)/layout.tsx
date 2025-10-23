'use client'

import { FooterTextProvider } from "@/contexts/FooterTextContext"
import LayoutFooter from "./_components/LayoutFooter"
import LayoutRight from "./_components/LayoutRight"

export interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout ({children}: DashboardLayoutProps) {
  return(
    <FooterTextProvider>
      <div className="h-screen grid grid-cols-[4rem_1fr_30rem] grid-rows-[2rem_1fr]">
        <header className="col-span-3 bg-green-200" />
        <aside className="overflow-y-auto p-2 bg-green-200" />
        <div className="flex flex-col h-full overflow-y-hidden">
          <main className="h-full overflow-y-auto border-6 border-gray-600 rounded-sm">
            <div className="border-1 border-gray-300 w-full h-full">
              <div className="border-4 border-gray-700 rounded-sm w-full h-full flex-1 overflow-y-auto">
                {children}
              </div>
            </div>
          </main>
          <LayoutFooter />
        </div>
        <LayoutRight />
      </div>
    </FooterTextProvider>
  )
}