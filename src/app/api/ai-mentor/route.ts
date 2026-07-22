import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_GENAI_API_KEY;

const SYSTEM_PROMPT = `You are an AI learning assistant for CSE Learner, a Computer Science education platform.

Your role:
1. Explain CS concepts clearly and concisely
2. Provide strategic hints for programming problems (without giving complete solutions unless asked)
3. Help debug code and suggest improvements
4. Generate code examples that demonstrate concepts
5. Adapt your teaching style to the hint level requested

Levels of help:
- MODERATE: Give strategic hints and suggestions but let the user figure out the implementation
- FULL: Provide complete step-by-step solution with code and detailed explanations
- MINIMAL: Just the core concepts or answer
- NONE: Provide complete solution with detailed explanations

Guidelines:
- Keep responses educational and focused on learning
- Use clear, simple language
- Break down complex problems into manageable steps
- Encourage learning over quick answers
- Always relate to CS curriculum and practical programming
- Always be encouraging and supportive of the learning process.`;

export async function POST(request: NextRequest) {
  try {
    if (!apiKey) {
      return NextResponse.json(
        {
          id: Math.random().toString(36).slice(2),
          promptId: "",
          response:
            "Error: Gemini API key is not configured. Set GOOGLE_GENAI_API_KEY env var. Get a free key from Google AI Studio (https://ai.studio.google.com/app/apikey)",
          explanation: undefined,
          relatedConcepts: [],
          difficultyLevel: "medium",
          codeSnippet: undefined,
          createdAt: Date.now(),
        },
        { status: 400 }
      );
    }

    const { question, context, hintLevel } = await request.json();

    if (!question) {
      return NextResponse.json(
        {
          id: Math.random().toString(36).slice(2),
          promptId: "",
          response: "Error: Question is required",
          explanation: undefined,
          relatedConcepts: [],
          difficultyLevel: "medium",
          createdAt: Date.now(),
        },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
      systemInstruction: SYSTEM_PROMPT,
    });

    const hintInstruction =
      hintLevel === "none"
        ? "Provide a complete solution with detailed explanation and step-by-step implementation."
        : "Provide guidance and strategic hints to help the student solve this problem. Give enough help to guide them through the concept but not a complete solution unless they have explicitly asked for it.";

    const userPrompt = hintInstruction + "\n\nContext: " + JSON.stringify(context, null, 2) + "\nQuestion: " + question;

    const result = await model.generateContent(userPrompt);
    const text = result.response.text();

    const response = {
      id: Math.random().toString(36).slice(2),
      promptId: Math.random().toString(36).slice(2),
      response: text,
      explanation: undefined,
      relatedConcepts: [],
      difficultyLevel: "medium",
      codeSnippet: undefined,
      createdAt: Date.now(),
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("AI Mentor API Error:", error);
    return NextResponse.json(
      {
        id: Math.random().toString(36).slice(2),
        promptId: "",
        response: "Something went wrong. Please try again later.",
        explanation: undefined,
        relatedConcepts: [],
        difficultyLevel: "medium",
        createdAt: Date.now(),
      },
      { status: 500 }
    );
  }
}
