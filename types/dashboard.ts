export interface DashboardData {
  totalBalance: number
  balanceChange: number
  income: number
  incomeChange: number
  expenses: number
  expensesChange: number
  activeAccounts: number
  accountsChange: number
  overviewData: {
    name: string
    income: number
    expenses: number
  }[]
  expensesByCategory: {
    name: string
    value: number
    color: string
  }[]
  recentTransactions: {
    id: string
    description: string
    amount: number
    date: string
    category: string
    type: "income" | "expense"
    merchant: {
      name: string
      logo?: string
    }
  }[]
}

