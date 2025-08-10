import { api } from "@/convex/_generated/api";
import { FeatureFlag, featureFlagEvents } from "@/features/flags";
import { client } from "@/lib/schematic";
import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { Innertube } from "youtubei.js";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
export interface TranscriptEntry {
  text: string;
  timestamp: string;
}
const youtube = await Innertube.create({
  lang: "en",
  location: "IND",
  retrieve_player: false,
});

function formatTimestamp(start_ms: number): string {
  const minutes = Math.floor(start_ms / 60000);
  const seconds = Math.floor((start_ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
async function fetchTranscript(videoId: string): Promise<TranscriptEntry[]> {
  try {
    const info = await youtube.getInfo(videoId);
    const transcriptData = await info.getTranscript();
    const transcript: TranscriptEntry[] =
      transcriptData.transcript.content?.body?.initial_segments.map(
        (segment) => ({
          text: segment.snippet.text ?? "N/A",
          timestamp: formatTimestamp(Number(segment.start_ms)),
        })
      ) ?? [];

    return transcript;
  } catch (error) {
    console.error("Error fetching transcript:", error);
    throw error;
  }
}
export async function getYoutubeTranscript(videoId: string) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  // TODO:Check if the transcript already exits in the database (is it cached?)

  // Check if the transcript exits in database
  const existingTranscript = await convex.query(
    api.transcript.getTranscriptByVideoId,
    { videoId, userId: user.id }
  );

  if (existingTranscript) {
    console.log("🔍 Transcript found in database");
    return {
      cache:
        "The video has already been transcribed - Accessing cached transcript instead of using a token",
      transcript: existingTranscript,
    };
  }

  try {
    const transcript = await fetchTranscript(videoId);

    // Store the transcript in the database
    await convex.mutation(api.transcript.storeTranscript, {
      videoId,
      userId: user.id,
      transcript,
    });

    await client.track({
      event: featureFlagEvents[FeatureFlag.TRANSCRIPTION].event,
      company: {
        id: user.id,
      },
      user: {
        id: user.id,
      },
    });

    return {
      transcript,
      cache:
        "The video has been transcribed - the transcript is now saved in the database and will be used in the future",
    };
  } catch (error) {
    console.error("Error fetching transcript:", error);
    return {
      transcript: [],
      cache: "Error fetching transcript, please try again later",
    };
  }
}
