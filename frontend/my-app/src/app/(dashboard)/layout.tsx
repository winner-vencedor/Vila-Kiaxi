import BottomNavigation from "@/shared/components/dashboard/bottomNavigation"

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-zinc-50">
      {children}
      <BottomNavigation/>
    </div>
  )
}
