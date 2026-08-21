import BottomNavigation from "@/shared/components/dashboard/BottomNav/bottomNavigation"
import Header from "@/shared/components/dashboard/Nav/header"
import Sidebar from "@/shared/components/dashboard/SideBarNavigation/sidebar"
export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (

    <div className="min-h-screen flex  bg-zinc-50" >
      <Sidebar/>
      <div  className="md:ml-64">
        <Header/>
      <main className="flex-1 pt-16 min-h-screen">
        {children}
        </main>
        </div>
      <BottomNavigation/>
    </div>

  )
}
