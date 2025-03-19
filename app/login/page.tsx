"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true)

    try {
      // In a real app, this would be an API call to authenticate the user
      console.log("Login data:", data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Login successful",
        description: "Welcome back to ChaserAI!",
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="container mx-auto px-4 py-8 ">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
          <div className="relative h-[300px] hidden md:block">
            <Image
                         src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sleek-1Z1R37uQzn9KFFjuNZD9ThbXkTOAhA.png"
              alt="Login illustration"
              fill
              className="object-contain"
            />
          </div>

          <div className="bg-background/80 backdrop-blur-sm p-8 rounded-lg shadow-sm border">
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold">Welcome back</h1>
              <p className="text-muted-foreground">Sign in to your ChaserAI account</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" className="backdrop-blur-sm bg-background/80" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="backdrop-blur-sm bg-background/80"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full backdrop-blur-sm bg-primary/90 hover:bg-primary/80"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center text-sm">
              <p className="text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="font-medium text-primary hover:underline">
                  Sign up
                </Link>
              </p>
              <Link href="#" className="font-medium text-primary hover:underline block mt-2">
                Forgot your password?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

