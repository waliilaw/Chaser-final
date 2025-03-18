import type { DashboardData } from "@/types/dashboard"

// Simulated API calls - in a real app, these would connect to a backend server

export async function fetchDashboardData(): Promise<DashboardData> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock data
  return {
    totalBalance: 12450.75,
    balanceChange: 5.2,
    income: 4500.0,
    incomeChange: 3.1,
    expenses: 2750.25,
    expensesChange: -2.5,
    activeAccounts: 3,
    accountsChange: 1,
    overviewData: [
      { name: "Jan 1", income: 500, expenses: 400 },
      { name: "Jan 8", income: 600, expenses: 500 },
      { name: "Jan 15", income: 800, expenses: 600 },
      { name: "Jan 22", income: 1200, expenses: 800 },
      { name: "Jan 29", income: 900, expenses: 700 },
      { name: "Feb 5", income: 1500, expenses: 900 },
      { name: "Feb 12", income: 1100, expenses: 850 },
    ],
    expensesByCategory: [
      { name: "Housing", value: 1200, color: "#FF6384" },
      { name: "Food", value: 450, color: "#36A2EB" },
      { name: "Transportation", value: 350, color: "#FFCE56" },
      { name: "Entertainment", value: 250, color: "#4BC0C0" },
      { name: "Utilities", value: 300, color: "#9966FF" },
      { name: "Other", value: 200, color: "#FF9F40" },
    ],
    recentTransactions: [
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
    ],
  }
}

export async function generateChatResponse(message: string): Promise<string> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Simple response logic based on keywords in the message
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("budget") || lowerMessage.includes("save")) {
    return "Based on your spending patterns, I recommend allocating 50% of your income to necessities, 30% to wants, and 20% to savings and debt repayment. This 50/30/20 rule is a good starting point for most people."
  }

  if (lowerMessage.includes("invest") || lowerMessage.includes("investment")) {
    return "For beginners, I recommend starting with index funds which provide broad market exposure with lower fees. Consider setting up a regular investment plan to take advantage of dollar-cost averaging."
  }

  if (lowerMessage.includes("debt") || lowerMessage.includes("loan")) {
    return "To tackle debt effectively, consider the avalanche method (paying off highest interest debt first) or the snowball method (paying off smallest debts first for psychological wins). The avalanche method saves more money in the long run."
  }

  if (lowerMessage.includes("expense") || lowerMessage.includes("spending")) {
    return "Looking at your recent transactions, your highest spending category is Housing (35%), followed by Food (15%). You might want to look at your Food expenses as there's been a 10% increase compared to last month."
  }

  // Default response
  return "I'm your AI financial assistant. I can help you with budgeting, investment advice, debt management, and analyzing your spending patterns. What specific financial question can I help you with today?"
}

