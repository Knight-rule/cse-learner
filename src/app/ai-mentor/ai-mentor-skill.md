"use client";

export const aiMentorSkill = {
  name: "ai-mentor",
  description: "AI-powered learning assistant for CS concepts and problem hints. Integrates with Gemini to provide personalized help for programming exercises and algorithm explanations.",
  triggers: ["ai mentor", "ask ai", "explain", "help with", "cs tutor"],
  handler: async (context: any) => {
    // For now, show info about setting up the AI mentor
    return `## AI Mentor - Learning Assistant

### What It Does
The AI Mentor provides personalized learning assistance for CS students. It can:
- Explain complex CS concepts
- Provide hints and guidance for programming problems
- Answer questions about algorithms
- Help debug code
- Suggest related concepts to explore
- Adapt help to your learning style

### How to Use It
\n1. **Visit the AI Mentor page**: Navigate to `/ai-mentor`
\n2. **Set your context**: Choose a course and/or specific problem
\n3. **Choose hint level**: \\n   - **None**: Get the full solution\n   - **Minimal**: Just the answer\n   - **Moderate**: Strategic hints\n   - **Full**: Step-by-step guidance
\n4. **Ask a question**: Submit any CS learning question
\n5. **Review the response**: Get explanations, code snippets, and related concepts
\n### Setup Requirements
To use the AI mentor, you need:
- **Gemini API Key**: A Google Gemini API key (can be obtained from Google AI Studio)
- **Environment Configuration**: The API key needs to be configured in the deployment environment

\n### Technical Details
- The AI Mentor uses Google\\'s Gemini Pro model for generating responses
- It learns from your interaction patterns to provide better help over time
- The AI adapts hint levels based on your skill level and the problem complexity
- All interactions are saved locally on your device

### Best Practices for Using the AI Mentor
1. **Start with high-level concepts** before diving into specific problems
2. **Try different hint levels** to see which helps you learn best
3. **Use follow-up questions** to deepen understanding
4. **Review provided code snippets** and explanations carefully
5. **Try similar problems** after receiving help to reinforce learning

The AI Mentor feature is currently under development. To activate it, your team will need to:
\n1. Obtain a Google Gemini API key from [Google AI Studio](https://ai.studio.google.com/app/apikey)
\n2. Set it up as an environment variable in your deployment configuration

\n\n**Would you like me to help you set up the AI mentor API integration? I can guide you through configuring the Gemini API key and testing the AI mentor functionality on your platform.**`; 
  },
};