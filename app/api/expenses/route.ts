import { type NextRequest, NextResponse } from "next/server"

// Mock database for expenses
const mockExpenses = [
  {
    id: "1",
    userId: "user1",
    amount: 85.75,
    category: "Food",
    description: "Grocery Shopping",
    date: "2023-03-15",
    merchant: "Whole Foods",
  },
  {
    id: "2",
    userId: "user1",
    amount: 120.5,
    category: "Utilities",
    description: "Electricity Bill",
    date: "2023-03-10",
    merchant: "Power Co",
  },
  {
    id: "3",
    userId: "user1",
    amount: 65.3,
    category: "Food",
    description: "Dinner with Friends",
    date: "2023-03-12",
    merchant: "Restaurant",
  },
  {
    id: "4",
    userId: "user1",
    amount: 1200.0,
    category: "Housing",
    description: "Monthly Rent",
    date: "2023-03-01",
    merchant: "Property Management",
  },
  {
    id: "5",
    userId: "user1",
    amount: 45.99,
    category: "Entertainment",
    description: "Streaming Services",
    date: "2023-03-05",
    merchant: "Netflix",
  },
]

export async function GET(req: NextRequest) {
  try {
    // In a real app, you would authenticate the user and filter by their userId
    // For now, we'll just return all mock expenses

    // Get query parameters for filtering
    const url = new URL(req.url)
    const category = url.searchParams.get("category")
    const startDate = url.searchParams.get("startDate")
    const endDate = url.searchParams.get("endDate")

    let filteredExpenses = [...mockExpenses]

    // Apply filters if provided
    if (category) {
      filteredExpenses = filteredExpenses.filter((expense) => expense.category.toLowerCase() === category.toLowerCase())
    }

    if (startDate) {
      filteredExpenses = filteredExpenses.filter((expense) => new Date(expense.date) >= new Date(startDate))
    }

    if (endDate) {
      filteredExpenses = filteredExpenses.filter((expense) => new Date(expense.date) <= new Date(endDate))
    }

    // Calculate total
    const total = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0)

    // Group by category
    const byCategory = filteredExpenses.reduce(
      (acc, expense) => {
        const category = expense.category
        if (!acc[category]) {
          acc[category] = {
            category,
            total: 0,
            count: 0,
          }
        }
        acc[category].total += expense.amount
        acc[category].count += 1
        return acc
      },
      {} as Record<string, { category: string; total: number; count: number }>,
    )

    return NextResponse.json({
      expenses: filteredExpenses,
      total,
      byCategory: Object.values(byCategory),
    })
  } catch (error) {
    console.error("Error fetching expenses:", error)
    return NextResponse.json({ error: "Failed to fetch expenses" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    // Validate required fields
    if (!data.amount || !data.category || !data.description || !data.date) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real app, you would save this to a database
    // For now, we'll just return the data with a mock ID
    const newExpense = {
      id: `${Date.now()}`,
      userId: "user1", // In a real app, this would come from authentication
      amount: Number.parseFloat(data.amount),
      category: data.category,
      description: data.description,
      date: data.date,
      merchant: data.merchant || "Unknown",
    }

    return NextResponse.json({
      success: true,
      expense: newExpense,
    })
  } catch (error) {
    console.error("Error creating expense:", error)
    return NextResponse.json({ error: "Failed to create expense" }, { status: 500 })
  }
}

