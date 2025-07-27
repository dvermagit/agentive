"use client";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

function AnalyseButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent border"
    >
      {pending ? "Analyzing..." : "Analyze"}
    </Button>
  );
}

export default AnalyseButton;
