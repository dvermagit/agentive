"use client";

import { useChat } from "ai/react";
import { Button } from "./ui/button";
import ReactMarkdown from "react-markdown";

interface ToolInvocation {
  toolCallId: string;
  toolName: string;
  result?: Record<string, unknown>;
}

interface ToolPart {
  type: "tool-invocation";
  toolInvocation: ToolInvocation;
}

const formatToolInvocation = (part: ToolPart) => {
  if (!part.toolInvocation) return "Unknown Tool";
  return `🔧 Tool Used: ${part.toolInvocation.toolName}`;
};
function AiAgentChat({ videoId }: { videoId: string }) {
  const { messages, handleSubmit, handleInputChange, input } = useChat({
    // api: "/api/chat",
    maxSteps: 5,
    body: {
      videoId: videoId,
    },
    // onError: (error) => {
    //   console.error("Frontend chat error:", error);
    // },
    // onResponse: (response) => {
    //   console.log("Chat response received:", response);
    // },
  });
  return (
    <div className="flex flex-col h-full">
      <div className="hidden lg:block px-4 pb-3 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">AI Agent</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-6">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full min-h-[200px]">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-medium text-gray-700">
                  Welcome to AI Agent Chat
                </h3>
                <p className="text-sm text-gray-500">
                  Ask any question about the video
                </p>
              </div>
            </div>
          )}

          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start "}`}
            >
              <div
                className={`max-w-[85%] ${m.role === "user" ? "bg-blue-500" : "bg-gray-100"} rounded-2xl px-4 py-3`}
              >
                {m.parts && m.role == "assistant" ? (
                  //AI Agent Message
                  <div className="space-y-3 ">
                    {m.parts.map((part, i) =>
                      part.type === "text" ? (
                        <div key={i} className="prose prose-sm max-w-none">
                          <ReactMarkdown>{m.content}</ReactMarkdown>
                        </div>
                      ) : part.type === "tool-invocation" ? (
                        <div
                          key={i}
                          className="bg-white/50 rounded-lg p-2 space-y-2 text-gray-800"
                        >
                          <div className="font-medium text-xs">
                            {formatToolInvocation(part as ToolPart)}
                          </div>
                          {(part as ToolPart).toolInvocation.result && (
                            <pre className="text-xs bg-white/75 p-2 rounded max-h-40 overflow-auto ">
                              {JSON.stringify(
                                (part as ToolPart).toolInvocation.result,
                                null,
                                2
                              )}
                            </pre>
                          )}
                        </div>
                      ) : null
                    )}
                  </div>
                ) : (
                  //User Message
                  <div className="prose prose-sm max-w-none text-white">
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="p-4 border-t border-gray-100 bg-white">
        <div className="space-y-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              className="flex-1 px-4 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="text"
              placeholder="Enter a question..."
              value={input}
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white text-sm rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed "
            >
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AiAgentChat;

//have use pnpm install ai@4.2.0
