"use server";

import { api } from "@/convex/_generated/api";
import { FeatureFlag, featureFlagEvents } from "@/features/flags";
import { getConvexClient } from "@/lib/convex";
import { client } from "@/lib/schematic";
import { google } from "@ai-sdk/google";
import { currentUser } from "@clerk/nextjs/server";
import { generateText } from "ai";

const convexClient = getConvexClient();
export async function titleGeneration(
  videoId: string,
  videoSummary: string,
  consideration: string
) {
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("User not found");
  }

  try {
    const response = await generateText({
      model: google("gemini-2.0-flash-lite"),
      messages: [
        {
          role: "system",
          content:
            "You are a helpful Youtube video creator assistant that creates high quality SEO friendly concise video titles.",
        },
        {
          role: "user",
          content: `Please provide ONE concise Youtube title (and nothing else) for this video. Focus on he main points and takeaways, it should be SEO friendly and 100 characters or less"\n\n${videoSummary}\n\n${consideration} `,
        },
      ],
      temperature: 0.7,
      maxTokens: 500,
    });

    const title = response.text || "Unable to generate title";

    if (!title) {
      return {
        error: "Failed to generate title (System error)",
      };
    }

    await convexClient.mutation(api.titles.generate, {
      videoId,
      userId: user.id,
      title: title,
    });

    await client.track({
      event: featureFlagEvents[FeatureFlag.TITLE_GENERATION].event,
      company: {
        id: user.id,
      },
      user: {
        id: user.id,
      },
    });

    console.log("Generated title:", title);
    return { title };
  } catch (error) {
    console.error("Error generating title:", error);
    throw new Error("Failed to generate title");
  }
}
