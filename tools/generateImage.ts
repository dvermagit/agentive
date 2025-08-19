import { ImageGeneration } from "@/actions/imageGeneration";
import { FeatureFlag } from "@/features/flags";
import { client } from "@/lib/schematic";
import { tool } from "ai";
import z from "zod";

export const generateImage = (videoId: string, userId: string) =>
  tool({
    description: "Generate an image",
    parameters: z.object({
      prompt: z.string().describe("The prompt to generate the image for"),
      videoId: z.string().describe("The Youtube video ID"),
    }),
    execute: async ({ prompt }) => {
      const schematicCtx = {
        company: { id: userId },
        user: {
          id: userId,
        },
      };
      const isImageGenerationEnabled = await client.checkFlag(
        schematicCtx,
        FeatureFlag.IMAGE_GENERATION
      );

      if (!isImageGenerationEnabled) {
        return {
          error: "Image generation is not enabled, the user must upgrade",
        };
      }
      const image = await ImageGeneration(prompt, videoId);
      return { image };
    },
  });
