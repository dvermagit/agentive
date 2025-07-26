type AgentPulseProps = {
  size?: "small" | "medium" | "large";
  color?: "blue" | "red" | "green" | "yellow";
};
function AgentPulse({ size = "medium", color = "blue" }: AgentPulseProps) {
  const sizeClasses = {
    small: "h-4 w-4",
    medium: "h-12 w-12",
    large: "h-16 w-16",
  };
  const colorClasses = {
    blue: "bg-blue-500 shadow-[0_0_0_2px_rgba(59,130,246,0.5)]",
    red: "bg-red-500 shadow-[0_0_0_2px_rgba(239,68,68,0.5)]",
    green: "bg-green-500 shadow-[0_0_0_2px_rgba(34,197,94,0.5)]",
    yellow: "bg-yellow-500 shadow-[0_0_0_2px_rgba(234,179,8,0.5)]",
  };

  return (
    <div
      className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-pulse`}
    />
  );
}

export default AgentPulse;
