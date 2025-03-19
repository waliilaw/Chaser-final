"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"
import { Loader2, Save, CreditCard } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Settings updated",
        description: "Your settings have been updated successfully.",
      })
    }, 1500)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Settings</h2>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="backdrop-blur-sm bg-background/80">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card className="backdrop-blur-sm bg-background/80">
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your account settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Account Information</h3>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="johndoe" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Regional Settings</h3>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="gbp">GBP (£)</SelectItem>
                      <SelectItem value="jpy">JPY (¥)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select defaultValue="mdy">
                    <SelectTrigger id="dateFormat">
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <Card className="backdrop-blur-sm bg-background/80">
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Customize your experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Dashboard Preferences</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Show Account Balances</div>
                    <div className="text-sm text-muted-foreground">Display your account balances on the dashboard</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Show Recent Transactions</div>
                    <div className="text-sm text-muted-foreground">
                      Display your recent transactions on the dashboard
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Show Budget Progress</div>
                    <div className="text-sm text-muted-foreground">Display your budget progress on the dashboard</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Financial Preferences</h3>

                <div className="space-y-2">
                  <Label htmlFor="startOfMonth">Financial Month Start Day</Label>
                  <Select defaultValue="1">
                    <SelectTrigger id="startOfMonth">
                      <SelectValue placeholder="Select start day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1st of month</SelectItem>
                      <SelectItem value="15">15th of month</SelectItem>
                      <SelectItem value="custom">Custom date</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budgetPeriod">Default Budget Period</Label>
                  <Select defaultValue="monthly">
                    <SelectTrigger id="budgetPeriod">
                      <SelectValue placeholder="Select budget period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4">
          <Card className="backdrop-blur-sm bg-background/80">
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Manage your privacy preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Data Sharing</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Share Usage Data</div>
                    <div className="text-sm text-muted-foreground">Help us improve by sharing anonymous usage data</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Personalized Recommendations</div>
                    <div className="text-sm text-muted-foreground">
                      Receive personalized financial recommendations based on your data
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Third-Party Integrations</div>
                    <div className="text-sm text-muted-foreground">
                      Allow third-party services to access your financial data
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Data Management</h3>

                <Button variant="outline" className="w-full">
                  Download My Data
                </Button>
                <Button variant="outline" className="w-full text-rose-500 hover:text-rose-600">
                  Delete My Account
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <Card className="backdrop-blur-sm bg-background/80">
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>Manage your subscription and payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Current Plan</h3>

                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-semibold text-lg">Premium Plan</div>
                    <Badge
                      variant="outline"
                      className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      Active
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mb-4">Your subscription renews on April 15, 2023</div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Change Plan
                    </Button>
                    <Button variant="outline" size="sm" className="text-rose-500 hover:text-rose-600">
                      Cancel Subscription
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Payment Methods</h3>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-16 bg-muted rounded flex items-center justify-center">
                        <CreditCard className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-medium">Visa ending in 4242</div>
                        <div className="text-sm text-muted-foreground">Expires 04/2025</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Add Payment Method
                </Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Billing History</h3>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">Premium Plan - Monthly</div>
                      <div className="text-sm text-muted-foreground">March 15, 2023</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="font-medium">$14.99</div>
                      <Button variant="ghost" size="sm">
                        Receipt
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">Premium Plan - Monthly</div>
                      <div className="text-sm text-muted-foreground">February 15, 2023</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="font-medium">$14.99</div>
                      <Button variant="ghost" size="sm">
                        Receipt
                      </Button>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  View All Transactions
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

