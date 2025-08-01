"use server";
import { VideoDetails } from "@/types/types";
import { google } from "googleapis";

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY,
});

export async function getVideoDetails(videoId: string) {
  console.log("Fetching video details for:", videoId);
  try {
    // Fetch video details and channel details
    const videoResponse = await youtube.videos.list({
      part: ["snippet", "statistics"],
      id: [videoId],
    });

    const videoDetails = videoResponse.data.items?.[0];

    console.log("✅ Video details");

    if (!videoDetails) {
      throw new Error("Video not found");
    }

    // Fetch channel details
    const channelResponse = await youtube.channels.list({
      part: ["snippet", "statistics"],
      id: [videoDetails.snippet?.channelId || ""],
      key: process.env.YOUTUBE_API_KEY,
    });

    const channelDetails = channelResponse.data.items?.[0];

    console.log("✅ Video details");

    const video: VideoDetails = {
      title: videoDetails.snippet?.title || "Unkown Title",
      thumbnail:
        videoDetails.snippet?.thumbnails?.high?.url ||
        videoDetails.snippet?.thumbnails?.default?.url ||
        videoDetails.snippet?.thumbnails?.maxres?.url ||
        "",
      publishedAt:
        videoDetails.snippet?.publishedAt || new Date().toISOString(),

      //video statistics
      views: videoDetails.statistics?.viewCount || "0",
      likes: videoDetails.statistics?.likeCount || "Not Available",
      comments: videoDetails.statistics?.commentCount || "Not Available",

      //channel details
      channel: {
        title: videoDetails.snippet?.channelTitle || "Unknown Channel",
        thumbnail: channelDetails?.snippet?.thumbnails?.default?.url || "",
        subscribers:
          channelDetails?.statistics?.subscriberCount || "Not Available",
      },
    };

    return video;
  } catch (error) {
    console.error("Error fetching video details:", error);
    return null;
  }
}
