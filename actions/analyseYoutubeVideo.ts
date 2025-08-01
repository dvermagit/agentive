"use server";
import { getVideoIdFromUrl } from "@/lib/getVideoIdFormUrl";
import { redirect } from "next/navigation";

export async function analyseYoutubeVideo(formData: FormData) {
  const url = formData.get("url") as string;
  if (!url) return;

  const videoId = getVideoIdFromUrl(url);
  // console.log("Video ID:", videoId);

  if (!videoId) return;

  redirect(`/video/${videoId}/analysis`);
}
