"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Check, CreditCard, DollarSign, Info, PieChart, Wallet } from "lucide-react"

export default function NotificationsPage() {
  // Sample notifications data
  const notifications = [
    {
      id: "n1",
      title: "Budget Alert",
      description: "You've reached 90% of your Food budget for this month.",
      date: "2023-03-21T10:30:00Z",
      read: false,
      type: "budget",
      icon: PieChart,
    },
    {
      id: "n2",
      title: "New Transaction",
      description: "A payment of $45.99 was made to Netflix.",
      date: "2023-03-20T15:45:00Z",
      read: false,
      type: "transaction",
      icon: CreditCard,
    },
    {
      id: "n3",
      title: "Account Connected",
      description: "Your Chase Bank account was successfully connected.",
      date: "2023-03-18T09:15:00Z",
      read: true,
      type: "account",
      icon: Wallet,
    },
    {
      id: "n4",
      title: "Subscription Renewal",
      description: "Your Premium subscription will renew in 3 days.",
      date: "2023-03-17T14:20:00Z",
      read: true,
      type: "billing",
      icon: DollarSign,
    },
    {
      id: "n5",
      title: "New Feature Available",
      description: "Check out our new AI-powered budget recommendations!",
      date: "2023-03-15T11:10:00Z",
      read: true,
      type: "system",
      icon: Info,
    },
  ]

  // Filter notifications by type
  const allNotifications = notifications
  const unreadNotifications = notifications.filter((n) => !n.read)
  const budgetNotifications = notifications.filter((n) => n.type === "budget")
  const transactionNotifications = notifications.filter((n) => n.type === "transaction")
  const accountNotifications = notifications.filter((n) => n.type === "account" || n.type === "billing")
  const systemNotifications = notifications.filter((n) => n.type === "system")

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) {
      return "Today"
    } else if (diffInDays === 1) {
      return "Yesterday"
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  // Render notification list
  const renderNotifications = (notificationList: typeof notifications) => {
    if (notificationList.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Bell className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No notifications</h3>
          <p className="text-sm text-muted-foreground">You don't have any notifications in this category.</p>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        {notificationList.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-start gap-4 p-4 rounded-lg border ${notification.read ? "bg-background" : "bg-muted/30"}`}
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                notification.type === "budget"
                  ? "bg-amber-100 text-amber-600"
                  : notification.type === "transaction"
                    ? "bg-blue-100 text-blue-600"
                    : notification.type === "account"
                      ? "bg-emerald-100 text-emerald-600"
                      : notification.type === "billing"
                        ? "bg-purple-100 text-purple-600"
                        : "bg-gray-100 text-gray-600"
              }`}
            >
              <notification.icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <div className="font-medium">{notification.title}</div>
                <div className="text-xs text-muted-foreground">{formatDate(notification.date)}</div>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{notification.description}</p>
              {!notification.read && (
                <Badge variant="outline" className="bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary">
                  New
                </Badge>
              )}
            </div>
            {!notification.read && (
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Check className="h-4 w-4" />
                <span className="sr-only">Mark as read</span>
              </Button>
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Notifications</h2>
        <div className="flex gap-2">
          <Button variant="outline">Mark All as Read</Button>
          <Button variant="outline">Settings</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="backdrop-blur-sm bg-background/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">All Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allNotifications.length}</div>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-background/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Unread</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadNotifications.length}</div>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-background/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Budget Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{budgetNotifications.length}</div>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-background/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{transactionNotifications.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="backdrop-blur-sm bg-background/80">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card className="backdrop-blur-sm bg-background/80">
            <CardHeader>
              <CardTitle>All Notifications</CardTitle>
              <CardDescription>View all your notifications</CardDescription>
            </CardHeader>
            <CardContent>{renderNotifications(allNotifications)}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          <Card className="backdrop-blur-sm bg-background/80">
            <CardHeader>
              <CardTitle>Unread Notifications</CardTitle>
              <CardDescription>View your unread notifications</CardDescription>
            </CardHeader>
            <CardContent>{renderNotifications(unreadNotifications)}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget" className="space-y-4">
          <Card className="backdrop-blur-sm bg-background/80">
            <CardHeader>
              <CardTitle>Budget Alerts</CardTitle>
              <CardDescription>View your budget-related notifications</CardDescription>
            </CardHeader>
            <CardContent>{renderNotifications(budgetNotifications)}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card className="backdrop-blur-sm bg-background/80">
            <CardHeader>
              <CardTitle>Transaction Notifications</CardTitle>
              <CardDescription>View your transaction-related notifications</CardDescription>
            </CardHeader>
            <CardContent>{renderNotifications(transactionNotifications)}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accounts" className="space-y-4">
          <Card className="backdrop-blur-sm bg-background/80">
            <CardHeader>
              <CardTitle>Account Notifications</CardTitle>
              <CardDescription>View your account and billing notifications</CardDescription>
            </CardHeader>
            <CardContent>{renderNotifications(accountNotifications)}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <Card className="backdrop-blur-sm bg-background/80">
            <CardHeader>
              <CardTitle>System Notifications</CardTitle>
              <CardDescription>View system and feature announcements</CardDescription>
            </CardHeader>
            <CardContent>{renderNotifications(systemNotifications)}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

