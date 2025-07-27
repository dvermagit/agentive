"use server";
import { redirect } from "next/navigation";

export async function analyseYoutubeVideo(formData: FormData) {
  const url = formData.get("url") as string;
  if (!url) return;

  const videoId = "abc"; //TODO Fix later
  if (!videoId) return;

  redirect(`/video/${videoId}/analysis`);
}
