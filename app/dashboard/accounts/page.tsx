"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BanknoteIcon as Bank, CreditCard, Plus, Wallet } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function AccountsPage() {
  // Sample accounts data
  const accounts = [
    {
      id: "a1",
      name: "Main Checking",
      type: "checking",
      balance: 3250.75,
      accountNumber: "****4567",
      institution: "Chase Bank",
      lastUpdated: "2023-03-21T10:30:00Z",
    },
    {
      id: "a2",
      name: "Savings",
      type: "savings",
      balance: 8500.25,
      accountNumber: "****7890",
      institution: "Chase Bank",
      lastUpdated: "2023-03-21T10:30:00Z",
    },
    {
      id: "a3",
      name: "Credit Card",
      type: "credit",
      balance: 450.5,
      limit: 5000,
      accountNumber: "****1234",
      institution: "American Express",
      lastUpdated: "2023-03-21T10:30:00Z",
    },
  ]

  // Sample balance history data
  const balanceHistory = [
    { date: "Jan", checking: 2100, savings: 7200, credit: 800 },
    { date: "Feb", checking: 2800, savings: 7800, credit: 600 },
    { date: "Mar", checking: 3250, savings: 8500, credit: 450 },
  ]

  // Calculate total assets and liabilities
  const totalAssets = accounts
    .filter((account) => account.type !== "credit")
    .reduce((sum, account) => sum + account.balance, 0)

  const totalLiabilities = accounts
    .filter((account) => account.type === "credit")
    .reduce((sum, account) => sum + account.balance, 0)

  const netWorth = totalAssets - totalLiabilities

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Accounts</h2>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Link Account
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="backdrop-blur-sm bg-background/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">${totalAssets.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Across {accounts.filter((a) => a.type !== "credit").length} accounts
            </p>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-background/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Liabilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-500">${totalLiabilities.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Across {accounts.filter((a) => a.type === "credit").length} accounts
            </p>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-background/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Worth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${netWorth.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Last updated {new Date().toLocaleDateString()}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="accounts" className="space-y-4">
        <TabsList className="backdrop-blur-sm bg-background/80">
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="history">Balance History</TabsTrigger>
        </TabsList>

        <TabsContent value="accounts" className="space-y-4">
          <div className="grid gap-4">
            {accounts.map((account) => (
              <Card key={account.id} className="backdrop-blur-sm bg-background/80">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {account.type === "checking" && <Bank className="h-5 w-5 text-primary" />}
                      {account.type === "savings" && <Wallet className="h-5 w-5 text-primary" />}
                      {account.type === "credit" && <CreditCard className="h-5 w-5 text-primary" />}
                      <CardTitle>{account.name}</CardTitle>
                    </div>
                    <Badge variant="outline">{account.type.charAt(0).toUpperCase() + account.type.slice(1)}</Badge>
                  </div>
                  <CardDescription>
                    {account.institution} • {account.accountNumber}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm text-muted-foreground">Current Balance</div>
                    <div className="text-xl font-bold">${account.balance.toFixed(2)}</div>
                  </div>

                  {account.type === "credit" && account.limit && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Credit Used</span>
                        <span>{((account.balance / account.limit) * 100).toFixed(0)}%</span>
                      </div>
                      <Progress value={(account.balance / account.limit) * 100} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>$0</span>
                        <span>Limit: ${account.limit}</span>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 text-xs text-muted-foreground">
                    Last updated: {new Date(account.lastUpdated).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card className="backdrop-blur-sm bg-background/80">
            <CardHeader>
              <CardTitle>Balance History</CardTitle>
              <CardDescription>Track your account balances over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={balanceHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip formatter={(value) => [`$${value}`, undefined]} />
                    <Legend />
                    <Line type="monotone" dataKey="checking" name="Checking" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="savings" name="Savings" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="credit" name="Credit Card" stroke="#ff7300" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

