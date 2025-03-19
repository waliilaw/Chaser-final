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

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  
  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarProvider defaultOpen={true}>
        <Sidebar variant="sidebar" collapsible="icon">
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <PieChart className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">ChaserAI</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard"} tooltip="Dashboard">
                  <a onClick={() => router.push("/dashboard")}>
                    <Home />
                    <span>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/expenses"} tooltip="Expenses">
                  <a onClick={() => router.push("/dashboard/expenses")}>
                    <BarChart3 />
                    <span>Expenses</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/budget"} tooltip="Budget">
                  <a onClick={() => router.push("/dashboard/budget")}>
                    <PieChart />
                    <span>Budget</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/transactions"} tooltip="Transactions">
                  <a onClick={() => router.push("/dashboard/transactions")}>
                    <CreditCard />
                    <span>Transactions</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/accounts"} tooltip="Accounts">
                  <a onClick={() => router.push("/dashboard/accounts")}>
                    <Wallet />
                    <span>Accounts</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/reports"} tooltip="Reports">
                  <a onClick={() => router.push("/dashboard/reports")}>
                    <LineChart />
                    <span>Reports</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/chat"} tooltip="AI Assistant">
                  <a onClick={() => router.push("/dashboard/chat")}>
                    <MessageSquare />
                    <span>AI Assistant</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/notifications"} tooltip="Notifications">
                  <a onClick={() => router.push("/dashboard/notifications")}>
                    <Bell />
                    <span>Notifications</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/settings"} tooltip="Settings">
                  <a onClick={() => router.push("/dashboard/settings")}>
                    <Settings />
                    <span>Settings</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/profile"} tooltip="Profile">
                  <a onClick={() => router.push("/dashboard/profile")}>
                    <User />
                    <span>John Doe</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Logout">
                  <a onClick={() => router.push("/")}>
                    <LogOut />
                    <span>Logout</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="bg-background">
          <div className="flex flex-col h-full">
            <header className="border-b bg-background/80 backdrop-blur-sm p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
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

