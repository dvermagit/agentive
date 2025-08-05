import dotenv from "dotenv";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getVideoDetails } from "@/actions/getVideoDetails";
import fetchTranscript from "@/tools/fetchTranscript";

dotenv.config();

const model = google("gemini-2.0-flash-lite");
export async function POST(req: Request) {
  const { messages, videoId } = await req.json();
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const videoDetails = await getVideoDetails(videoId);
  const systemMessage = `You are an AI agent ready to accept questions from the user about ONE specific video. The video ID in question is ${videoId} but you'll refer to this as ${videoDetails?.title || "Selected Video"}. Use emojis to make the conversation more engaging. If an error occurs, explain it to the user and ask them to try again later. If the error suggest the user upgrade, explain that they must upgrade to use the feature, tell them to go to 'Manage Plan' in the header and upgrade. If any tool is used, analyse the response and if it contains a cache, explain that the transcript is cached because they previously transcribed the video saving the user a token - use words like database instead of cache to make it more easy to understand. Format for notion.`;

  const result = await streamText({
    model,
    messages: [
      {
        role: "system",
        content: systemMessage,
        // role: "user",
        // content: "Can you fetch the transcript of this video?",
      },
      ...messages,
    ],
    tools: { fetchTranscript: fetchTranscript },
    // tools: { fetchTranscript },
  });

  return result.toDataStreamResponse();
}

// //gemini-2.0-flash-lite

// import dotenv from "dotenv";
// import { google } from "@ai-sdk/google";
// import { streamText } from "ai";
// import { currentUser } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import { getVideoDetails } from "@/actions/getVideoDetails";
// import fetchTranscript from "@/tools/fetchTranscript"; // Import your tool

// dotenv.config();

// const model = google("gemini-1.5-flash-latest");

// export async function POST(req: Request) {
//   try {
//     // Parse request body
//     const body = await req.json();
//     const { messages, videoId } = body;

//     // Validate required fields
//     if (!messages || !Array.isArray(messages)) {
//       return NextResponse.json(
//         { error: "Invalid messages format" },
//         { status: 400 }
//       );
//     }

//     if (!videoId) {
//       return NextResponse.json(
//         { error: "Video ID is required" },
//         { status: 400 }
//       );
//     }

//     // Check authentication
//     const user = await currentUser();
//     if (!user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // Fetch video details
//     const videoDetails = await getVideoDetails(videoId);

//     // Handle case where video details might not be found
//     if (!videoDetails) {
//       return NextResponse.json({ error: "Video not found" }, { status: 404 });
//     }

//     // Enhanced system message with tool usage instructions
//     const systemMessage = `You are an AI assistant helping users with questions about a specific video.

// Video Information:
// - Title: ${videoDetails.title || "Selected Video"}
// - Video ID: ${videoId}

// Available Tools:
// - fetchTranscript: Use this tool to fetch the video transcript when users ask about the video content, quotes, or need specific information from the video.

// Guidelines:
// 1. 📹 Always refer to the video by its title, not the ID
// 2. 😊 Use emojis appropriately to make conversations engaging
// 3. 🎯 Stay focused on questions about this specific video
// 4. 📝 When users ask about video content, use the fetchTranscript tool with the video ID
// 5. 💾 If a transcript is retrieved from the database (cached), explain that it was saved from a previous transcription, saving the user tokens
// 6. ⚡ If rate limits or quota errors occur, kindly explain and suggest trying again later
// 7. 💎 If features require an upgrade, direct users to 'Manage Plan' in the header
// 8. 📋 Format responses for easy copying to Notion (use markdown formatting)
// 9. 🔍 When displaying transcript content, format it nicely with timestamps

// Remember to be helpful, clear, and concise in your responses.`;

//     // Stream the response with tools
//     const result = await streamText({
//       model,
//       messages: [
//         {
//           role: "system",
//           content: systemMessage,
//         },
//         ...messages,
//       ],
//       tools: {
//         fetchTranscript: fetchTranscript,
//       },
//       // Optional: Add temperature and other parameters
//       temperature: 0.7,
//       maxTokens: 2000,
//       // Tool settings
//       toolChoice: "auto", // Let the model decide when to use tools
//     });

//     return result.toDataStreamResponse();
//   } catch (error) {
//     console.error("Chat endpoint error:", error);

//     // Handle specific error types
//     if (error instanceof Error) {
//       // Rate limit error
//       if (error.message.includes("rate limit")) {
//         return NextResponse.json(
//           { error: "Too many requests. Please try again later." },
//           { status: 429 }
//         );
//       }

//       // Model errors
//       if (error.message.includes("model")) {
//         return NextResponse.json(
//           { error: "AI model temporarily unavailable. Please try again." },
//           { status: 503 }
//         );
//       }
//     }

//     // Generic error response
//     return NextResponse.json(
//       { error: "An unexpected error occurred. Please try again." },
//       { status: 500 }
//     );
//   }
// }

//////

////

///

//

//
//
//
//
//

// import dotenv from "dotenv";
// import { google } from "@ai-sdk/google";
// import { streamText } from "ai";
// import { currentUser } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import { getVideoDetails } from "@/actions/getVideoDetails";
// import { tool } from "ai";
// import { z } from "zod";
// import { getYoutubeTranscript } from "@/actions/getYoutubeTranscript";
// import fetchTranscript from "@/tools/fetchTranscript";

// dotenv.config();

// const model = google("gemini-2.0-flash-lite");

// // Simple version first - let's test without tools
// export async function POST(req: Request) {
//   try {
//     console.log("🚀 Chat endpoint started");

//     const body = await req.json();
//     console.log("📦 Request body:", JSON.stringify(body, null, 2));

//     const { messages, videoId } = body;

//     // Validate required fields
//     if (!messages || !Array.isArray(messages)) {
//       console.log("❌ Invalid messages");
//       return NextResponse.json(
//         { error: "Messages array is required" },
//         { status: 400 }
//       );
//     }

//     if (!videoId || typeof videoId !== "string") {
//       console.log("❌ Invalid videoId");
//       return NextResponse.json(
//         { error: "Valid videoId is required" },
//         { status: 400 }
//       );
//     }

//     console.log("🔐 Checking user authentication...");
//     const user = await currentUser();
//     if (!user) {
//       console.log("❌ User not authenticated");
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }
//     console.log("✅ User authenticated:", user.id);

//     console.log("📹 Fetching video details...");
//     const videoDetails = await getVideoDetails(videoId);
//     if (!videoDetails) {
//       console.log("❌ Video details not found");
//       return NextResponse.json(
//         { error: "Video details not found" },
//         { status: 404 }
//       );
//     }
//     console.log("✅ Video details fetched:", videoDetails.title);

//     const systemMessage = `You are an AI agent ready to accept questions from the user about ONE specific video.

// The video ID in question is ${videoId} but you'll refer to this as "${videoDetails?.title || "Selected Video"}".

// Use emojis to make the conversation more engaging.

// Respond to the user's messages about this video. Be helpful and engaging.

// If an error occurs, explain it to the user and ask them to try again later.`;

//     console.log("🤖 Starting streamText...");
//     console.log("📝 System message:", systemMessage);
//     console.log("💬 Messages count:", messages.length);

//     // Test without tools first
//     const result = await streamText({
//       model,
//       messages: [
//         {
//           role: "system",
//           content: systemMessage,
//         },
//         ...messages,
//       ],
//       tools: { fetchTranscript: fetchTranscript },
//       temperature: 0.7,
//       maxTokens: 1000,
//     });

//     console.log("✅ StreamText created, returning response");
//     return result.toDataStreamResponse();
//   } catch (error) {
//     console.error("💥 Error in chat endpoint:", error);
//     console.error(
//       "Stack trace:",
//       error instanceof Error ? error.stack : "No stack trace"
//     );

//     return NextResponse.json(
//       {
//         error: "Internal server error",
//         details: error instanceof Error ? error.message : "Unknown error",
//       },
//       { status: 500 }
//     );
//   }
// }
