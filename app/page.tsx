import AgentPulse from "@/components/AgentPulse";
import { Agent } from "http";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen ">
      {/* hero section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 md:px-0 py-12">
          <div className="flex flex-col items-center gap-10 text-center mb-12">
            <AgentPulse size="large" color="blue" />

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Meet Your Personal{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                AI Content Agent
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Transform your video content with AI-powered
              analysis,transcription, and insights. Get started in seconds.
            </p>

            {/* <YoutubeVideoForm/> */}
          </div>
        </div>
      </section>

      {/* features section */}

      {/* how it works section */}

      {/* footer */}
    </div>
  );
}
