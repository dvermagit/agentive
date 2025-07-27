import AgentPulse from "@/components/AgentPulse";
import YoutubeVideoForm from "@/components/YoutubeVideoForm";
import {
  Brain,
  ImageIcon,
  MessageCircle,
  MessageSquare,
  Sparkles,
  Video,
} from "lucide-react";

const steps = [
  {
    title: "1. Content Your Content",
    description:
      "Share your Youtube video URL and let your AI agent get to work.",
    icon: Video,
  },
  {
    title: "2. AI Agent Analysis",
    description: "Your personal agent analyzes every aspect of your content.",
    icon: Brain,
  },
  {
    title: "3. Recieve Intelligence",
    description:
      "Get actionable insights and strategic recommendations to enhance your content.",
    icon: MessageSquare,
  },
];
const features = [
  {
    title: "AI Analysis",
    description:
      "Get deep insights into your video content with AI-driven analysis.",
    icon: Brain,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
  },
  {
    title: "Smart Transcription",
    description: "Generate accurate transcriptions of your videos in seconds.",
    icon: MessageSquare,
    iconBg: "bg-green-100",
    iconColor: "text-green-500",
  },
  {
    title: "Thumbnail Generation",
    description: "Generate eye-catching thumbnails for your videos using AI.",
    icon: ImageIcon,
    iconBg: "bg-purple-100",
    iconColor: "text-purple -500",
  },
  {
    title: "Title Generations",
    description: "Create engaging titles for your videos with AI assistance.",
    icon: MessageCircle,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-500",
  },
  {
    title: "Shot Script",
    description:
      "Get a detailed, step-by-step instruction to recreate iral videos. Learn shooting techniques, angles, and editing tips from your successfull content.",
    icon: Video,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
  },
  {
    title: "Discuss with Your AI Agent",
    description:
      "Interact with your AI agent to get personalized content suggestions and insights.",
    icon: Sparkles,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
  },
];

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

            <YoutubeVideoForm />
          </div>
        </div>
      </section>

      {/* features section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-8">
            Powerful features to enhance your content creation
          </h2>

          {/* festures cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-500 transition-all duration-300"
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${feature.iconBg} mb-4`}
                  >
                    <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* how it works section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl ">
          <h2 className="text-3xl font-bold text-center mb-12">
            Meet Your AI Agent in 3 Simple Steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl  drop-shadow-lg hover:shadow-lg transition-all"
                >
                  <div className="w-16 h-16  bg-gradient-to-r from-blue-600 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* footer section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-400 py-20">
        <div className="text-center">
          <h2 className="text-3xl text-white font-bold mb-6">
            Ready To Meet Your AI Content Agent?
          </h2>
          <p className="text-xl text-blue-50 mb-8">
            Join creators leveraging AI to unlock content insights
          </p>
        </div>
        <p className="absolute bottom-0 right-1 left-1 justify-center text-sm font-bold text-black text-center">
          &copy; {new Date().getFullYear()} Agentive. All rights reserved.
        </p>
      </section>
    </div>
  );
}
