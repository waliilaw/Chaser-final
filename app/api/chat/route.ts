import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required and must be a string" }, { status: 400 })
    }

    // Use the AI SDK to generate a response
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `You are a helpful financial assistant. The user says: ${message}. 
      Provide a helpful, concise response about their finances. 
      If they ask about their spending, mention that their highest categories are Housing and Food.
      If they ask about investments, recommend index funds and ETFs for beginners.
      If they ask about budgeting, suggest the 50/30/20 rule.
      Keep your response under 150 words.`,
    })

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
  }
}

