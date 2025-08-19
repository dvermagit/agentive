import { titleGeneration } from "@/actions/titleGeneration";
import { tool } from "ai";
import z from "zod";

const generateTitle = tool({
  description: "Generate a title for a Youtube video",
  parameters: z.object({
    videoId: z.string().describe("The Youtube video ID"),
    videoSummary: z
      .string()
      .describe(
        "The summary of the video to generate a title for use transcript to generate summary"
      ),
    consideration: z
      .string()
      .describe("Any additional considerations for the video"),
  }),
  execute: async ({ videoId, videoSummary, consideration }) => {
    const title = await titleGeneration(videoId, videoSummary, consideration);
    return { title };
  },
});

export default generateTitle;
