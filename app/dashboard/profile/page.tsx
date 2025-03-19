"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"
import { Loader2, Save } from "lucide-react"

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    }, 1500)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Profile</h2>
      </div>

      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList className="backdrop-blur-sm bg-background/80">
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="connected">Connected Accounts</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card className="backdrop-blur-sm bg-background/80">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex flex-col items-center gap-2">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                </div>

                <div className="grid gap-4 flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Address Information</h3>

                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" defaultValue="123 Main St" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" defaultValue="San Francisco" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" defaultValue="CA" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" defaultValue="94105" />
                  </div>
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

        <TabsContent value="security" className="space-y-4">
          <Card className="backdrop-blur-sm bg-background/80">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Change Password</h3>

                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Two-Factor Authentication</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Enable Two-Factor Authentication</div>
                    <div className="text-sm text-muted-foreground">Add an extra layer of security to your account</div>
                  </div>
                  <Switch />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Sessions</h3>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Current Session</div>
                      <div className="text-sm text-muted-foreground">San Francisco, CA • Chrome on macOS</div>
                    </div>
                    <div className="text-sm text-emerald-500">Active Now</div>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Sign Out of All Sessions
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

        <TabsContent value="notifications" className="space-y-4">
          <Card className="backdrop-blur-sm bg-background/80">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Account Updates</div>
                      <div className="text-sm text-muted-foreground">Receive emails about your account activity</div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Budget Alerts</div>
                      <div className="text-sm text-muted-foreground">
                        Get notified when you're close to your budget limits
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Financial Insights</div>
                      <div className="text-sm text-muted-foreground">
                        Receive personalized financial tips and insights
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Marketing & Promotions</div>
                      <div className="text-sm text-muted-foreground">
                        Receive emails about new features and special offers
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Push Notifications</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Transaction Alerts</div>
                      <div className="text-sm text-muted-foreground">Get notified about new transactions</div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Bill Reminders</div>
                      <div className="text-sm text-muted-foreground">Receive reminders about upcoming bills</div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Goal Progress</div>
                      <div className="text-sm text-muted-foreground">Get updates on your financial goals</div>
                    </div>
                    <Switch />
                  </div>
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

        <TabsContent value="connected" className="space-y-4">
          <Card className="backdrop-blur-sm bg-background/80">
            <CardHeader>
              <CardTitle>Connected Accounts</CardTitle>
              <CardDescription>Manage your connected financial accounts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg" alt="Chase Bank" />
                      <AvatarFallback>CB</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">Chase Bank</div>
                      <div className="text-sm text-muted-foreground">Connected on March 10, 2023</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Disconnect
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg" alt="American Express" />
                      <AvatarFallback>AE</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">American Express</div>
                      <div className="text-sm text-muted-foreground">Connected on March 15, 2023</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Disconnect
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Connect a New Account</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-6 gap-2">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder.svg" alt="Bank of America" />
                      <AvatarFallback>BA</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">Bank of America</div>
                  </Button>

                  <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-6 gap-2">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder.svg" alt="Wells Fargo" />
                      <AvatarFallback>WF</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">Wells Fargo</div>
                  </Button>

                  <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-6 gap-2">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder.svg" alt="Citibank" />
                      <AvatarFallback>CB</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">Citibank</div>
                  </Button>
                </div>

                <Button className="w-full">Connect More Accounts</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

