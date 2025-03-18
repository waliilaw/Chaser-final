"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
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
import { BarChart3, CreditCard, Home, LogOut, MessageSquare, PieChart, Settings } from "lucide-react"
import { ThemeProvider } from "@/components/theme-provider"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <SidebarProvider>
        <div className="flex h-screen overflow-hidden">
          <Sidebar>
            <SidebarHeader>
              <div className="flex items-center gap-2 px-4 py-2">
                <PieChart className="h-6 w-6 text-primary" />
                <span className="font-bold text-xl">FinanceAI</span>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
                    <a href="/dashboard">
                      <Home />
                      <span>Dashboard</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/dashboard/expenses"}>
                    <a href="/dashboard/expenses">
                      <BarChart3 />
                      <span>Expenses</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/dashboard/budget"}>
                    <a href="/dashboard/budget">
                      <PieChart />
                      <span>Budget</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/dashboard/transactions"}>
                    <a href="/dashboard/transactions">
                      <CreditCard />
                      <span>Transactions</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/dashboard/chat"}>
                    <a href="/dashboard/chat">
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
                  <SidebarMenuButton asChild isActive={pathname === "/dashboard/settings"}>
                    <a href="/dashboard/settings">
                      <Settings />
                      <span>Settings</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/dashboard/profile">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/placeholder.svg" alt="User" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <span>John Doe</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/">
                      <LogOut />
                      <span>Logout</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset className="bg-muted/30">
            <div className="flex flex-col h-full">
              <header className="border-b bg-background/80 backdrop-blur-sm p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SidebarTrigger />
                  <h1 className="text-xl font-semibold">
                    {pathname === "/dashboard" && "Dashboard"}
                    {pathname === "/dashboard/expenses" && "Expenses"}
                    {pathname === "/dashboard/budget" && "Budget"}
                    {pathname === "/dashboard/transactions" && "Transactions"}
                    {pathname === "/dashboard/chat" && "AI Assistant"}
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
        </div>
      </SidebarProvider>
    </ThemeProvider>
  )
}

