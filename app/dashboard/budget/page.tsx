"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Plus, AlertCircle } from "lucide-react"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

export default function BudgetPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Sample budget data
  const budgetData = {
    totalBudget: 3500,
    spent: 2150,
    remaining: 1350,
    categories: [
      { name: "Housing", budget: 1200, spent: 1200, remaining: 0, color: COLORS[0] },
      { name: "Food", budget: 600, spent: 450, remaining: 150, color: COLORS[1] },
      { name: "Transportation", budget: 400, spent: 250, remaining: 150, color: COLORS[2] },
      { name: "Entertainment", budget: 300, spent: 150, remaining: 150, color: COLORS[3] },
      { name: "Utilities", budget: 350, spent: 100, remaining: 250, color: COLORS[4] },
      { name: "Other", budget: 650, spent: 0, remaining: 650, color: COLORS[5] },
    ],
  }

  // Data for pie chart
  const pieData = budgetData.categories.map((cat) => ({
    name: cat.name,
    value: cat.budget,
    color: cat.color,
  }))

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Budget Planner</h2>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Create Budget
        </Button>
      </div>

      <Card className="backdrop-blur-sm bg-background/80">
        <CardHeader>
          <CardTitle>Monthly Budget Overview</CardTitle>
          <CardDescription>Budget period: March 1 - March 31, 2023</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium text-muted-foreground">Total Budget</div>
              <div className="text-2xl font-bold">${budgetData.totalBudget.toFixed(2)}</div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium text-muted-foreground">Spent</div>
              <div className="text-2xl font-bold text-rose-500">${budgetData.spent.toFixed(2)}</div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium text-muted-foreground">Remaining</div>
              <div className="text-2xl font-bold text-emerald-500">${budgetData.remaining.toFixed(2)}</div>
            </div>
          </div>

          <Progress value={(budgetData.spent / budgetData.totalBudget) * 100} className="h-3 mb-6" />

          <div className="text-sm text-muted-foreground mb-6">
            You've spent {((budgetData.spent / budgetData.totalBudget) * 100).toFixed(0)}% of your monthly budget
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList className="backdrop-blur-sm bg-background/80">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card className="backdrop-blur-sm bg-background/80">
            <CardHeader>
              <CardTitle>Budget Allocation</CardTitle>
              <CardDescription>How your budget is distributed across categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`$${value}`, "Budget"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="space-y-4">
                    {budgetData.categories.map((category) => (
                      <div key={category.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: category.color }} />
                            <span className="font-medium">{category.name}</span>
                          </div>
                          <div className="text-sm font-medium">
                            ${category.spent} / ${category.budget}
                          </div>
                        </div>
                        <Progress
                          value={(category.spent / category.budget) * 100}
                          className="h-2"
                          indicatorClassName ={category.spent === category.budget ? "bg-amber-500" : ""}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card className="backdrop-blur-sm bg-background/80">
            <CardHeader>
              <CardTitle>Budget Categories</CardTitle>
              <CardDescription>Manage your budget categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {budgetData.categories.map((category) => (
                  <div key={category.name} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full" style={{ backgroundColor: category.color }} />
                        <h3 className="font-semibold">{category.name}</h3>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-2">
                      <div>
                        <div className="text-sm text-muted-foreground">Budget</div>
                        <div className="font-medium">${category.budget}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Spent</div>
                        <div className="font-medium">${category.spent}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Remaining</div>
                        <div className="font-medium">${category.remaining}</div>
                      </div>
                    </div>
                    <Progress
                      value={(category.spent / category.budget) * 100}
                      className="h-2"
                      indicatorClassName={category.spent === category.budget ? "bg-amber-500" : ""}
                    />
                    {category.spent === category.budget && (
                      <div className="flex items-center gap-2 mt-2 text-amber-500 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>Budget limit reached</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card className="backdrop-blur-sm bg-background/80">
            <CardHeader>
              <CardTitle>Budget History</CardTitle>
              <CardDescription>View your past budget performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">February 2023</h3>
                  <div className="grid grid-cols-3 gap-4 mb-2">
                    <div>
                      <div className="text-sm text-muted-foreground">Budget</div>
                      <div className="font-medium">$3,500.00</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Spent</div>
                      <div className="font-medium">$3,200.00</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Saved</div>
                      <div className="font-medium text-emerald-500">$300.00</div>
                    </div>
                  </div>
                  <Progress value={91} className="h-2" />
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">January 2023</h3>
                  <div className="grid grid-cols-3 gap-4 mb-2">
                    <div>
                      <div className="text-sm text-muted-foreground">Budget</div>
                      <div className="font-medium">$3,500.00</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Spent</div>
                      <div className="font-medium">$3,700.00</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Overspent</div>
                      <div className="font-medium text-rose-500">$200.00</div>
                    </div>
                  </div>
                  <Progress value={105} className="h-2" indicatorClassName="bg-rose-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

