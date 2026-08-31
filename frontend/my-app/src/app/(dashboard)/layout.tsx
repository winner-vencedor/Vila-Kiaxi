"use client"

import { useState } from "react"
import BottomNavigation from "@/shared/components/dashboard/BottomNav/bottomNavigation"
import Header from "@/shared/components/dashboard/Nav/header"
import Sidebar from "@/shared/components/dashboard/SideBarNavigation/sidebar"
import { sideBarContext } from "@/shared/components/dashboard/SideBarNavigation/hooks/useSidebar"
export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const [expanded, setexpanded] = useState(true)

  return (

    <sideBarContext.Provider value={{ expanded, setexpanded }}>
      <div className="min-h-screen bg-zinc-50">
        <Sidebar />
        <div className={`min-w-0 transition-[margin] duration-200 ${expanded ? "md:ml-37" : "md:ml-20"}`}>
          <Header />
          <main className="min-h-screen w-full min-w-0 pb-20 md:pt-16 md:pb-0">
            <div className="w-full min-w-0">
              {children}
            </div>
          </main>
        </div>
        <BottomNavigation />
      </div>
    </sideBarContext.Provider>

  )
}
