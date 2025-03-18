import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

// Mock user database
const users = [
  {
    id: "user1",
    email: "user@example.com",
    // In a real app, this would be hashed
    password: "password123",
    name: "John Doe",
  },
]

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    // Validate input
    const result = loginSchema.safeParse(data)
    if (!result.success) {
      return NextResponse.json({ error: "Invalid credentials format" }, { status: 400 })
    }

    // Find user
    const user = users.find((u) => u.email === data.email)

    // Check if user exists and password matches
    if (!user || user.password !== data.password) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // In a real app, you would generate a JWT token here
    const token = "mock_jwt_token"

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    })
  } catch (error) {
    console.error("Error in authentication:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}

