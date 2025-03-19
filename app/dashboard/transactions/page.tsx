"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Download, Filter, Search, SlidersHorizontal } from "lucide-react"

export default function TransactionsPage() {
  const [date, setDate] = useState<Date>()

  // Sample transactions data
  const transactions = [
    {
      id: "t1",
      description: "Grocery Shopping",
      amount: 85.75,
      date: "2023-03-15",
      category: "Food",
      type: "expense",
      merchant: {
        name: "Whole Foods",
        logo: "/placeholder.svg?height=36&width=36",
      },
    },
    {
      id: "t2",
      description: "Monthly Salary",
      amount: 4500.0,
      date: "2023-03-01",
      category: "Income",
      type: "income",
      merchant: {
        name: "Acme Inc",
        logo: "/placeholder.svg?height=36&width=36",
      },
    },
    {
      id: "t3",
      description: "Electricity Bill",
      amount: 120.5,
      date: "2023-03-10",
      category: "Utilities",
      type: "expense",
      merchant: {
        name: "Power Co",
        logo: "/placeholder.svg?height=36&width=36",
      },
    },
    {
      id: "t4",
      description: "Dinner with Friends",
      amount: 65.3,
      date: "2023-03-12",
      category: "Food",
      type: "expense",
      merchant: {
        name: "Restaurant",
        logo: "/placeholder.svg?height=36&width=36",
      },
    },
    {
      id: "t5",
      description: "Freelance Project",
      amount: 850.0,
      date: "2023-03-08",
      category: "Income",
      type: "income",
      merchant: {
        name: "Client XYZ",
        logo: "/placeholder.svg?height=36&width=36",
      },
    },
    {
      id: "t6",
      description: "Gas",
      amount: 40.25,
      date: "2023-03-08",
      category: "Transportation",
      type: "expense",
      merchant: {
        name: "Shell",
        logo: "/placeholder.svg?height=36&width=36",
      },
    },
    {
      id: "t7",
      description: "Internet Bill",
      amount: 75.0,
      date: "2023-03-20",
      category: "Utilities",
      type: "expense",
      merchant: {
        name: "ISP Co",
        logo: "/placeholder.svg?height=36&width=36",
      },
    },
    {
      id: "t8",
      description: "Monthly Rent",
      amount: 1200.0,
      date: "2023-03-01",
      category: "Housing",
      type: "expense",
      merchant: {
        name: "Property Management",
        logo: "/placeholder.svg?height=36&width=36",
      },
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Transactions</h2>
        <Button className="flex items-center gap-2">
          <Download className="h-4 w-4" /> Export
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="backdrop-blur-sm bg-background/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">$5,350.00</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-background/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-500">$1,632.79</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-background/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">$3,717.21</div>
            <p className="text-xs text-muted-foreground">For March 2023</p>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-background/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Card className="backdrop-blur-sm bg-background/80">
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
          <CardDescription>View and manage your transactions</CardDescription>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search transactions..." className="pl-8" />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[180px] justify-start text-left font-normal">
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
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={transaction.merchant.logo} alt={transaction.merchant.name} />
                        <AvatarFallback>{transaction.merchant.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {transaction.merchant.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={transaction.type === "income" ? "outline" : "secondary"}
                      className={
                        transaction.type === "income"
                          ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-700"
                          : "bg-rose-50 text-rose-700 hover:bg-rose-50 hover:text-rose-700"
                      }
                    >
                      {transaction.type === "income" ? "Income" : "Expense"}
                    </Badge>
                  </TableCell>
                  <TableCell
                    className={`text-right font-medium ${
                      transaction.type === "income" ? "text-emerald-500" : "text-rose-500"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

