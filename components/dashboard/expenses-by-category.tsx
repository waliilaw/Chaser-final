"use client"

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

interface ExpensesByCategoryProps {
  data: {
    name: string
    value: number
    color: string
  }[]
}

export function ExpensesByCategory({ data }: ExpensesByCategoryProps) {
  const total = data.reduce((acc, curr) => acc + curr.value, 0)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [`$${value.toFixed(2)}`, undefined]}
              contentStyle={{ backgroundColor: "hsl(var(--background))", borderColor: "hsl(var(--border))" }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div>
        <div className="space-y-4">
          {data.map((category) => (
            <div key={category.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: category.color }} />
                <span>{category.name}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-medium">${category.value.toFixed(2)}</span>
                <span className="text-xs text-muted-foreground">{((category.value / total) * 100).toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

