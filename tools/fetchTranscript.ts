import { getYoutubeTranscript } from "@/actions/getYoutubeTranscript";
import { tool } from "ai";
import { z } from "zod";

const fetchTranscript = tool({
  description: "Fetches the transcript of a youtube video in schema",
  parameters: z.object({
    videoId: z
      .string()
      .describe("The ID of the video to fetch the transcript for"),
  }),

  execute: async ({ videoId }) => {
    const transcript = await getYoutubeTranscript(videoId);
    return {
      cache: transcript.cache,
      transcript: transcript.transcript,
    };
  },
});

export default fetchTranscript;
