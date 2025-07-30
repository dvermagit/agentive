"use client";
import ThumbnailGeneration from "@/components/ThumbnailGeneration";
import TitleGeneration from "@/components/TitleGeneration";
import Usage from "@/components/Usage";
import YoutubeVideoDetails from "@/components/YoutubeVideoDetails";
import { FeatureFlag } from "@/features/flags";
import { useParams } from "next/navigation";

function AnalysisPage() {
  const params = useParams<{ videoId: string }>();
  const { videoId } = params;

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
        </div>
        {/* Right side */}
        <div className="order-1 lg:order-2 lg:sticky lg:top-20 h-[500px] md:h-[calc(100vh-6em)]">
          {/* AI agent chat section */}
        </div>
      </div>
    </div>
  );
}

export default AnalysisPage;
