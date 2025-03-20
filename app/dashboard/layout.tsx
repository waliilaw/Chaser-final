"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BarChart3,
  CreditCard,
  Home,
  LogOut,
  MessageSquare,
  PieChart,
  Settings,
  User,
  Wallet,
  LineChart,
  Bell,
} from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleSidebarClose = () => {
    setSidebarOpen(false)
  }

  const handleSidebarOpen = () => {
    setSidebarOpen(true)
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarProvider defaultOpen={sidebarOpen}>
        <Sidebar variant="sidebar" collapsible="icon" open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <PieChart className="h-6 w-6 text-primary" />
              <div className="font-bold text-xl cursor-pointer" onClick={() => {router.push('/')}} >ChaserAI</div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard"} tooltip="Dashboard">
                  <div onClick={() => { router.push("/dashboard"); handleSidebarClose(); }}>
                    <Home />
                    <span>Dashboard</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/expenses"} tooltip="Expenses">
                  <div onClick={() => { router.push("/dashboard/expenses"); handleSidebarClose(); }}>
                    <BarChart3 />
                    <span>Expenses</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/budget"} tooltip="Budget">
                  <div onClick={() => { router.push("/dashboard/budget"); handleSidebarClose(); }}>
                    <PieChart />
                    <span>Budget</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/transactions"} tooltip="Transactions">
                  <div onClick={() => { router.push("/dashboard/transactions"); handleSidebarClose(); }}>
                    <CreditCard />
                    <span>Transactions</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/accounts"} tooltip="Accounts">
                  <div onClick={() => { router.push("/dashboard/accounts"); handleSidebarClose(); }}>
                    <Wallet />
                    <span>Accounts</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/reports"} tooltip="Reports">
                  <div onClick={() => { router.push("/dashboard/reports"); handleSidebarClose(); }}>
                    <LineChart />
                    <span>Reports</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/chat"} tooltip="AI Assistant">
                  <div onClick={() => { router.push("/dashboard/chat"); handleSidebarClose(); }}>
                    <MessageSquare />
                    <span>AI Assistant</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/notifications"} tooltip="Notifications">
                  <div onClick={() => { router.push("/dashboard/notifications"); handleSidebarClose(); }}>
                    <Bell />
                    <span>Notifications</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/settings"} tooltip="Settings">
                  <div onClick={() => { router.push("/dashboard/settings"); handleSidebarClose(); }}>
                    <Settings />
                    <span>Settings</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/profile"} tooltip="Profile">
                  <div onClick={() => { router.push("/dashboard/profile"); handleSidebarClose(); }}>
                    <User />
                    <span>John Doe</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Logout">
                  <div onClick={() => { router.push("/"); handleSidebarClose(); }}>
                    <LogOut />
                    <span>Logout</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="bg-background">
          <div className="flex flex-col h-full">
            <header className="border-b bg-background/80 backdrop-blur-sm p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SidebarTrigger onClick={handleSidebarOpen} />
                <h1 className="text-xl font-semibold">
                  {pathname === "/dashboard" && "Dashboard"}
                  {pathname === "/dashboard/expenses" && "Expenses"}
                  {pathname === "/dashboard/budget" && "Budget"}
                  {pathname === "/dashboard/transactions" && "Transactions"}
                  {pathname === "/dashboard/accounts" && "Accounts"}
                  {pathname === "/dashboard/reports" && "Reports"}
                  {pathname === "/dashboard/chat" && "AI Assistant"}
                  {pathname === "/dashboard/notifications" && "Notifications"}
                  {pathname === "/dashboard/settings" && "Settings"}
                  {pathname === "/dashboard/profile" && "Profile"}
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </div>
            </header>
            <main className="flex-1 overflow-auto p-6">{children}</main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

