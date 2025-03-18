import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { formatCurrency, formatDate } from "@/lib/utils"

interface Transaction {
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
}

interface RecentTransactionsProps {
  transactions: Transaction[]
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <Card key={transaction.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center p-4">
              <Avatar className="h-9 w-9 mr-4">
                <AvatarImage
                  src={transaction.merchant.logo || "/placeholder.svg?height=36&width=36"}
                  alt={transaction.merchant.name}
                />
                <AvatarFallback>{transaction.merchant.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{transaction.description}</p>
                  <p
                    className={`text-sm font-medium ${transaction.type === "income" ? "text-emerald-500" : "text-rose-500"}`}
                  >
                    {transaction.type === "income" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span>{transaction.merchant.name}</span>
                    <span>•</span>
                    <span>{formatDate(transaction.date)}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {transaction.category}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

