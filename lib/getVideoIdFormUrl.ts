export function getVideoIdFromUrl(url: string): string | null {
  let videoId: string | null = null;

  if (url.includes("youtu.be/")) {
    //Shoetened URL format: https://youtu.be/VIDEO_ID
    videoId = url.split("youtu.be/")[1]?.split(/[?#]/)[0] || null;
  } else if (url.includes("youtube.com/shorts/")) {
    //Shorts URL format: https://www.youtube.com/shorts/VIDEO_ID
    videoId = url.split("shorts/")[1]?.split(/[?#]/)[0] || null;
  } else if (url.includes("v=")) {
    videoId = url.split("v=")[1]?.split(/[&#?]/)[0] || null;
  }

  return videoId;
}
