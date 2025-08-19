// import { api } from "@/convex/_generated/api";
// import { FeatureFlag, featureFlagEvents } from "@/features/flags";
// import { getConvexClient } from "@/lib/convex";
// import { currentUser } from "@clerk/nextjs/server";
// import { InferenceClient } from "@huggingface/inference";
// import { client as schematicClient } from "@/lib/schematic";
// import { Client } from "@gradio/client";
// const IMAGE_SIZE = "1792x1024" as const;
// const convexClient = getConvexClient();
// // const client = new InferenceClient(process.env.HUGGINGFACE_API_KEY);
// const client = await Client.connect("black-forest-labs/FLUX.1-schnell");

// export const ImageGeneration = async (prompt: string, videoId: string) => {
//   const user = await currentUser();

//   if (!user?.id) {
//     throw new Error("User not found");
//   }

//   if (!prompt) {
//     throw new Error("Prompt not found");
//   }

//   console.log("Generating image for prompt:", prompt);

//   const imageResponse: any = await client.predict("/infer", {
//     provider: "together",
//     model: "black-forest-labs/FLUX.1-schnell",
//     inputs: prompt,
//     parameters: { num_inference_steps: 2 },
//     size: IMAGE_SIZE,
//   });

//   const imageUrl = imageResponse.data[0].url;

//   if (!imageUrl) {
//     throw new Error("Failed to generate image");
//   }

//   //   Step 1: Get a short-lived upload URL for Convex
//   console.log("Getting uploading URL...");
//   const postUrl = await convexClient.mutation(api.images.generateUploadUrl);
//   console.log("Got upload URL");

//   //   Step 2: Download the image from Hugging Face
//   console.log("Downloading image...");
//   const imageBuffer = await fetch(imageUrl).then((res) => res.arrayBuffer());
//   const image: Blob = await fetch(imageUrl).then((res) => res.blob());
//   console.log("Downloaded image");

//   //   Step 3: Upload the image to Convex Storage bucket
//   console.log("Uploading image...");
//   const result = await fetch(postUrl, {
//     method: "POST",
//     body: image,
//     headers: {
//       "Content-type": image!.type,
//     },
//   });
//   const { storageId } = await result.json();
//   console.log("Uploaded image");

//   //   Step 4: Save the newly allocated storage id to the database
//   await convexClient.mutation(api.images.storeImage, {
//     storageId: storageId,
//     videoId,
//     userId: user.id,
//   });

//   // Get serve image url
//   const dbImageUrl = await convexClient.query(api.images.getImage, {
//     videoId,
//     userId: user.id,
//   });

//   // Track the image generation event
//   await schematicClient.track({
//     event: featureFlagEvents[FeatureFlag.IMAGE_GENERATION].event,
//     company: {
//       id: user.id,
//     },
//     user: {
//       id: user.id,
//     },
//   });
//   return {
//     imageUrl: dbImageUrl,
//   };
// };
"use server";
import { api } from "@/convex/_generated/api";
import { FeatureFlag, featureFlagEvents } from "@/features/flags";
import { getConvexClient } from "@/lib/convex";
import { currentUser } from "@clerk/nextjs/server";
import { client as schematicClient } from "@/lib/schematic";
import { Client } from "@gradio/client";

const IMAGE_SIZE = "1792x1024" as const;
const convexClient = getConvexClient();

// Initialize Gradio client outside the function for better performance
let gradioClient: any = null;

const getGradioClient = async () => {
  if (!gradioClient) {
    gradioClient = await Client.connect("black-forest-labs/FLUX.1-schnell");
  }
  return gradioClient;
};

export const ImageGeneration = async (prompt: string, videoId: string) => {
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("User not found");
  }

  if (!prompt || prompt.trim() === "") {
    throw new Error("Prompt not found or empty");
  }

  console.log("Generating image for prompt:", prompt);

  try {
    const client = await getGradioClient();

    // Fix: Pass parameters as separate arguments, not as an object
    const imageResponse: any = await client.predict("/infer", {
      prompt: prompt, // Make sure prompt is explicitly named
      num_inference_steps: 2,
      width: 1792,
      height: 1024,
    });

    // Alternative approach if the above doesn't work:
    // const imageResponse: any = await client.predict("/infer", [
    //   prompt, // First argument
    //   2,      // num_inference_steps
    //   1792,   // width
    //   1024    // height
    // ]);

    console.log("Image response:", imageResponse);

    const imageUrl = imageResponse?.data?.[0]?.url;

    if (!imageUrl) {
      console.error("No image URL in response:", imageResponse);
      throw new Error("Failed to generate image - no URL returned");
    }

    // Step 1: Get a short-lived upload URL for Convex
    console.log("Getting uploading URL...");
    const postUrl = await convexClient.mutation(api.images.generateUploadUrl);
    console.log("Got upload URL");

    // Step 2: Download the image from the generated URL
    console.log("Downloading image...");
    const imageResponse_fetch = await fetch(imageUrl);

    if (!imageResponse_fetch.ok) {
      throw new Error(
        `Failed to fetch image: ${imageResponse_fetch.statusText}`
      );
    }

    const image: Blob = await imageResponse_fetch.blob();
    console.log("Downloaded image, size:", image.size);

    // Step 3: Upload the image to Convex Storage bucket
    console.log("Uploading image...");
    const result = await fetch(postUrl, {
      method: "POST",
      body: image,
      headers: {
        "Content-Type": image.type,
      },
    });

    if (!result.ok) {
      throw new Error(`Failed to upload image: ${result.statusText}`);
    }

    const { storageId } = await result.json();
    console.log("Uploaded image with storage ID:", storageId);

    // Step 4: Save the newly allocated storage id to the database
    await convexClient.mutation(api.images.storeImage, {
      storageId: storageId,
      videoId,
      userId: user.id,
    });

    // Get serve image url
    const dbImageUrl = await convexClient.query(api.images.getImage, {
      videoId,
      userId: user.id,
    });

    // Track the image generation event
    await schematicClient.track({
      event: featureFlagEvents[FeatureFlag.IMAGE_GENERATION].event,
      company: {
        id: user.id,
      },
      user: {
        id: user.id,
      },
    });

    return {
      imageUrl: dbImageUrl,
    };
  } catch (error) {
    console.error("Error in ImageGeneration:", error);
    throw error;
  }
};
