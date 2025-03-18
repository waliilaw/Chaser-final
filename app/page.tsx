import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BarChart3, MessageSquare, PieChart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-8 md:py-16">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-2">
            <PieChart className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">FinanceAI</span>
          </div>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="ghost" className="backdrop-blur-sm bg-background/80">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="backdrop-blur-sm bg-primary/90 hover:bg-primary/80">Sign Up</Button>
            </Link>
          </div>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Manage your finances with AI</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Track expenses, analyze spending patterns, and get personalized financial advice with our AI-powered
              finance management app.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <Button size="lg" className="backdrop-blur-sm bg-primary/90 hover:bg-primary/80">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="backdrop-blur-sm bg-background/80">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[400px]">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rolling-CisHOWaDKgeZ8Hzt0kwyVcqV8gGjXD.png"
              alt="Finance management illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expense Tracking</h3>
              <p className="text-muted-foreground">
                Categorize and track your expenses over time with intuitive visualizations.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Assistant</h3>
              <p className="text-muted-foreground">
                Get personalized financial advice and insights from our AI chatbot.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <PieChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Budget Planning</h3>
              <p className="text-muted-foreground">
                Create and manage budgets based on your spending patterns and financial goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative h-[300px] w-full md:w-1/2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zombieing-HJSpr5e3RhnIZcLTUU7ydZxxPaZCnR.png"
                alt="Happy customer"
                fill
                className="object-contain"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">What Our Users Say</h2>
              <blockquote className="border-l-4 border-primary pl-4 italic text-lg text-muted-foreground mb-6">
                "FinanceAI has completely transformed how I manage my money. The expense tracking is intuitive, and the
                AI chatbot gives me personalized advice that's actually helpful!"
              </blockquote>
              <p className="font-semibold">- Sarah Johnson, Small Business Owner</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="relative h-[200px] w-full mb-8">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sleek-1Z1R37uQzn9KFFjuNZD9ThbXkTOAhA.png"
              alt="Finance illustration"
              fill
              className="object-contain"
            />
          </div>
          <h2 className="text-3xl font-bold mb-4">Ready to take control of your finances?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who have improved their financial health with FinanceAI.
          </p>
          <Link href="/register">
            <Button size="lg" className="backdrop-blur-sm bg-primary/90 hover:bg-primary/80">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <PieChart className="h-5 w-5 text-primary" />
              <span className="font-bold">FinanceAI</span>
            </div>
            <div className="flex gap-8">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} FinanceAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

