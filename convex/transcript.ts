import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get transcript by video id
export const getTranscriptByVideoId = query({
  args: {
    videoId: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("transcript")
      .withIndex("by_user_and_video", (q) =>
        q.eq("userId", args.userId).eq("videoId", args.videoId)
      )
      .unique();
  },
});

// Store a transcript for a video

export const storeTranscript = mutation({
  args: {
    videoId: v.string(),
    userId: v.string(),
    transcript: v.array(
      v.object({
        timestamp: v.string(),
        text: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    // Check if transcript already exists in database
    const existingTranscript = await ctx.db
      .query("transcript")
      .withIndex("by_user_and_video", (q) =>
        q.eq("userId", args.userId).eq("videoId", args.videoId)
      )
      .unique();

    if (existingTranscript) return existingTranscript;

    // Create new transcript
    const newTranscript = await ctx.db.insert("transcript", {
      videoId: args.videoId,
      userId: args.userId,
      transcript: args.transcript,
    });
    return newTranscript;
  },
});

// Get all transcript for a user
export const getTranscriptByUserId = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("transcript")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

// Delete transcript by Id
export const deleteTranscriptById = mutation({
  args: { id: v.id("transcript"), userId: v.string() },
  handler: async (ctx, args) => {
    const transcript = await ctx.db.get(args.id);

    if (!transcript) {
      throw new Error("Transcript not found");
    }
    if (transcript.userId !== args.userId) {
      throw new Error("You are not authorized to delete this transcript");
    }
    return await ctx.db.delete(args.id);
  },
});
