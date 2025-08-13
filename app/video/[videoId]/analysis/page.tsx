"use client";
import { createOrGetVideo } from "@/actions/createOrGetVideo";
import AiAgentChat from "@/components/AiAgentChat";
import ThumbnailGeneration from "@/components/ThumbnailGeneration";
import TitleGeneration from "@/components/TitleGeneration";
import TranscriptionGeneration from "@/components/TranscriptionGeneration";
import Usage from "@/components/Usage";
import YoutubeVideoDetails from "@/components/YoutubeVideoDetails";
import { Doc } from "@/convex/_generated/dataModel";
import { FeatureFlag } from "@/features/flags";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function AnalysisPage() {
  const params = useParams<{ videoId: string }>();
  const { videoId } = params;
  const { user } = useUser();
  const [videos, setVideos] = useState<Doc<"videos"> | null | undefined>(
    undefined
  );

  useEffect(() => {
    if (!user?.id) return;

    const fetchVideo = async () => {
      //Analyse the video (add video to db here)
      const response = await createOrGetVideo(videoId as string, user.id);
      if (!response.success) {
      } else {
        setVideos(response.data);
      }
    };
    fetchVideo();
  }, [videoId, user]);
  return (
    <div className="xl:container mx-auto px-4 md:px-0 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side */}
        <div className="order-2 lg:order-1 flex flex-col gap-4 bg-white lg:border-r border-gray-200 p-6">
          {/* Analysis Section */}
          <div className="flex flex-col gap-4 p-4 border border-gray-200 rounded-xl">
            <Usage
              featureFlag={FeatureFlag.ANALYSE_VIDEO}
              title="Video Analysis"
            />

            {/* Video Transcription status  */}
          </div>
          {/* Youtube Video Details */}
          <YoutubeVideoDetails videoId={videoId} />
          {/* Thumbnail Generations */}
          <ThumbnailGeneration videoId={videoId} />
          {/* Titles Generation */}
          <TitleGeneration videoId={videoId} />
          {/* Transcription Generation */}
          <TranscriptionGeneration videoId={videoId} />
        </div>
        {/* Right side */}
        <div className="order-1 lg:order-2 lg:sticky lg:top-20 h-[500px] md:h-[calc(100vh-6em)]">
          {/* AI agent chat section */}
          <AiAgentChat videoId={videoId} />
        </div>
      </div>
    </div>
  );
}

export default AnalysisPage;
