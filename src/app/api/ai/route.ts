import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { topic } = await request.json();

    if (!topic) {
      return NextResponse.json(
        { error: "Topic is required" },
        { status: 400 }
      );
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You are a professional blog writer. Always respond with a valid JSON object only.
          The JSON must have exactly these fields:
          {
            "title": "catchy blog title here",
            "excerpt": "1-2 sentence summary here",
            "content": "<p>full blog in HTML format with h2, p, ul, li, strong tags</p>",
            "tags": ["tag1", "tag2", "tag3"]
          }`,
        },
        {
          role: "user",
          content: `Write a blog post about: ${topic}`,
        },
      ],
    });

    const text = completion.choices[0].message.content || "";
    console.log("Groq response:", text);

    const parsed = JSON.parse(text);

    return NextResponse.json(parsed, { status: 200 });
  } catch (error) {
    console.error("Groq error:", error);
    return NextResponse.json(
      { error: "Failed to generate blog", details: String(error) },
      { status: 500 }
    );
  }
}