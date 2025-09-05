import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { createGroq } from "@ai-sdk/groq"

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY || "",
})

export async function POST(request: NextRequest) {
  try {
    if (!process.env.GROQ_API_KEY) {
      console.error(
        "Transform API error: Groq API key is missing. Pass it using the 'apiKey' parameter or the GROQ_API_KEY environment variable.",
      )
      return NextResponse.json({ error: "API 키가 설정되지 않았습니다." }, { status: 500 })
    }

    const { text, style } = await request.json()

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "텍스트가 필요합니다." }, { status: 400 })
    }

    const prompt = `다음 텍스트를 "${style}" 스타일로 변환해주세요. 
    
요구사항:
1. 이모지를 적극적으로 활용하세요 (각 문장마다 1-2개)
2. 줄바꿈을 적극적으로 사용해서 읽기 쉽게 만드세요
3. 너무 길어지지 않게 간결하게 표현하세요
4. 따뜻하고 친근한 느낌을 주세요
5. 한국어로 자연스럽게 변환하세요

원본 텍스트: "${text}"

변환된 텍스트:`

    const { text: transformedText } = await generateText({
      model: groq("llama-3.1-70b-versatile"),
      prompt,
      maxTokens: 500,
      temperature: 0.7,
    })

    return NextResponse.json({
      transformedText: transformedText.trim(),
    })
  } catch (error) {
    console.error("Transform API error:", error)
    return NextResponse.json({ error: "변환 중 오류가 발생했습니다." }, { status: 500 })
  }
}
