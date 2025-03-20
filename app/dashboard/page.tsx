"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowDown, ArrowUp, DollarSign, TrendingDown, TrendingUp, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Overview } from "@/components/dashboard/overview"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { ExpensesByCategory } from "@/components/dashboard/expenses-by-category"
import { fetchDashboardData } from "@/lib/api"
import type { DashboardData } from "@/types/dashboard"

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const dashboardData = await fetchDashboardData()
        setData(dashboardData)
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-muted-foreground mb-4">Failed to load dashboard data</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="backdrop-blur-sm bg-background/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data.totalBalance.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+{data.balanceChange}% from last month</p>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-background/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data.income.toFixed(2)}</div>
            <div className="flex items-center text-xs text-emerald-500">
              <ArrowUp className="mr-1 h-3 w-3" />
              {data.incomeChange}% from last month
            </div>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-background/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data.expenses.toFixed(2)}</div>
            <div className="flex items-center text-xs text-rose-500">
              <ArrowDown className="mr-1 h-3 w-3" />
              {data.expensesChange}% from last month
            </div>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-background/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Accounts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.activeAccounts}</div>
            <p className="text-xs text-muted-foreground">
              {data.accountsChange > 0 ? "+" : ""}
              {data.accountsChange} from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="backdrop-blur-sm bg-background/80">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card className="backdrop-blur-sm bg-background/80">
            <CardHeader>
              <CardTitle>Financial Overview</CardTitle>
              <CardDescription>Your financial activity for the past 30 days</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview data={data.overviewData} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="transactions" className="space-y-4">
          <Card className="backdrop-blur-sm bg-background/80">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your most recent transactions across all accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentTransactions transactions={data.recentTransactions} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="categories" className="space-y-4">
          <Card className="backdrop-blur-sm bg-background/80">
            <CardHeader>
              <CardTitle>Expenses by Category</CardTitle>
              <CardDescription>Breakdown of your expenses by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ExpensesByCategory data={data.expensesByCategory} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

