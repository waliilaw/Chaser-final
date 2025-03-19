"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Download, FileText } from "lucide-react"

export default function ReportsPage() {
  const [period, setPeriod] = useState("month")

  // Sample data for charts
  const incomeVsExpenses = [
    { month: "Jan", income: 3500, expenses: 2800 },
    { month: "Feb", income: 4200, expenses: 3100 },
    { month: "Mar", income: 5350, expenses: 1632 },
  ]

  const categoryBreakdown = [
    { name: "Housing", value: 1200, color: "#0088FE" },
    { name: "Food", value: 151.05, color: "#00C49F" },
    { name: "Utilities", value: 195.5, color: "#FFBB28" },
    { name: "Transportation", value: 40.25, color: "#FF8042" },
    { name: "Entertainment", value: 45.99, color: "#8884d8" },
  ]

  const savingsRate = [
    { month: "Jan", rate: 20 },
    { month: "Feb", rate: 26 },
    { month: "Mar", rate: 69 },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Financial Reports</h2>
        <div className="flex gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Last 3 Months</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="backdrop-blur-sm bg-background/80">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="income">Income vs Expenses</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="savings">Savings Rate</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="backdrop-blur-sm bg-background/80">
              <CardHeader className="pb-2">
                <CardTitle>Income vs Expenses</CardTitle>
                <CardDescription>Comparison over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={incomeVsExpenses}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `$${value}`} />
                      <Tooltip formatter={(value) => [`$${value}`, undefined]} />
                      <Legend />
                      <Bar dataKey="income" name="Income" fill="#8884d8" />
                      <Bar dataKey="expenses" name="Expenses" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-background/80">
              <CardHeader className="pb-2">
                <CardTitle>Expense Categories</CardTitle>
                <CardDescription>Breakdown by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryBreakdown}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`$${value}`, undefined]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-background/80">
              <CardHeader className="pb-2">
                <CardTitle>Savings Rate</CardTitle>
                <CardDescription>Percentage of income saved</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={savingsRate}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `${value}%`} />
                      <Tooltip formatter={(value) => [`${value}%`, "Savings Rate"]} />
                      <Line type="monotone" dataKey="rate" name="Savings Rate" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="backdrop-blur-sm bg-background/80">
            <CardHeader>
              <CardTitle>Financial Summary</CardTitle>
              <CardDescription>Key financial metrics for the selected period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">Total Income</div>
                  <div className="text-2xl font-bold">$13,050.00</div>
                  <div className="text-xs text-emerald-500">+15% from previous period</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">Total Expenses</div>
                  <div className="text-2xl font-bold">$7,532.00</div>
                  <div className="text-xs text-rose-500">+8% from previous period</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">Net Savings</div>
                  <div className="text-2xl font-bold">$5,518.00</div>
                  <div className="text-xs text-emerald-500">+25% from previous period</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">Average Savings Rate</div>
                  <div className="text-2xl font-bold">42%</div>
                  <div className="text-xs text-emerald-500">+10% from previous period</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button variant="outline" className="flex items-center gap-2">
              <FileText className="h-4 w-4" /> Generate Detailed Report
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="income" className="space-y-4">
          <Card className="backdrop-blur-sm bg-background/80">
            <CardHeader>
              <CardTitle>Income vs Expenses</CardTitle>
              <CardDescription>Detailed comparison over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={incomeVsExpenses}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip formatter={(value) => [`$${value}`, undefined]} />
                    <Legend />
                    <Bar dataKey="income" name="Income" fill="#8884d8" />
                    <Bar dataKey="expenses" name="Expenses" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card className="backdrop-blur-sm bg-background/80">
            <CardHeader>
              <CardTitle>Expense Categories</CardTitle>
              <CardDescription>Detailed breakdown by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryBreakdown}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`$${value}`, undefined]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="space-y-4">
                    {categoryBreakdown.map((category) => (
                      <div key={category.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: category.color }} />
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="font-medium">${category.value.toFixed(2)}</span>
                          <span className="text-xs text-muted-foreground">
                            {(
                              (category.value / categoryBreakdown.reduce((sum, cat) => sum + cat.value, 0)) *
                              100
                            ).toFixed(1)}
                            %
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="savings" className="space-y-4">
          <Card className="backdrop-blur-sm bg-background/80">
            <CardHeader>
              <CardTitle>Savings Rate</CardTitle>
              <CardDescription>Percentage of income saved over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={savingsRate}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value) => [`${value}%`, "Savings Rate"]} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="rate"
                      name="Savings Rate"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
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

