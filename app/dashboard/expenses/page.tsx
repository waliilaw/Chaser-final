"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Filter, Plus, Search, SlidersHorizontal } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export default function ExpensesPage() {
  const [date, setDate] = useState<Date>()

  // Sample expenses data
  const expenses = [
    {
      id: "1",
      date: "2023-03-15",
      description: "Grocery Shopping",
      category: "Food",
      amount: 85.75,
      merchant: "Whole Foods",
    },
    {
      id: "2",
      date: "2023-03-10",
      description: "Electricity Bill",
      category: "Utilities",
      amount: 120.5,
      merchant: "Power Co",
    },
    {
      id: "3",
      date: "2023-03-12",
      description: "Dinner with Friends",
      category: "Food",
      amount: 65.3,
      merchant: "Restaurant",
    },
    {
      id: "4",
      date: "2023-03-01",
      description: "Monthly Rent",
      category: "Housing",
      amount: 1200.0,
      merchant: "Property Management",
    },
    {
      id: "5",
      date: "2023-03-05",
      description: "Streaming Services",
      category: "Entertainment",
      amount: 45.99,
      merchant: "Netflix",
    },
    {
      id: "6",
      date: "2023-03-08",
      description: "Gas",
      category: "Transportation",
      amount: 40.25,
      merchant: "Shell",
    },
    {
      id: "7",
      date: "2023-03-20",
      description: "Internet Bill",
      category: "Utilities",
      amount: 75.0,
      merchant: "ISP Co",
    },
  ]

  // Data for bar chart
  const chartData = [
    { name: "Housing", amount: 1200 },
    { name: "Food", amount: 151.05 },
    { name: "Utilities", amount: 195.5 },
    { name: "Transportation", amount: 40.25 },
    { name: "Entertainment", amount: 45.99 },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Expenses</h2>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Expense
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="backdrop-blur-sm bg-background/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,632.79</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-background/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Highest Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Housing</div>
            <p className="text-xs text-muted-foreground">$1,200.00 (73.5%)</p>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-background/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Per Day</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$54.43</div>
            <p className="text-xs text-muted-foreground">For March 2023</p>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-background/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList className="backdrop-blur-sm bg-background/80">
          <TabsTrigger value="list">List</TabsTrigger>
          <TabsTrigger value="chart">Chart</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <Card className="backdrop-blur-sm bg-background/80">
            <CardHeader>
              <CardTitle>Expense Transactions</CardTitle>
              <CardDescription>View and manage your expense transactions</CardDescription>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search expenses..." className="pl-8" />
                </div>
                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Merchant</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                      <TableCell>{expense.description}</TableCell>
                      <TableCell>{expense.category}</TableCell>
                      <TableCell>{expense.merchant}</TableCell>
                      <TableCell className="text-right font-medium">${expense.amount.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chart" className="space-y-4">
          <Card className="backdrop-blur-sm bg-background/80">
            <CardHeader>
              <CardTitle>Expenses by Category</CardTitle>
              <CardDescription>Breakdown of your expenses by category</CardDescription>
              <div className="flex gap-4 mt-4">
                <Select defaultValue="march">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="january">January 2023</SelectItem>
                    <SelectItem value="february">February 2023</SelectItem>
                    <SelectItem value="march">March 2023</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                    <Legend />
                    <Bar dataKey="amount" name="Amount" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

