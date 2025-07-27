import Form from "next/form";
import AnalyseButton from "./AnalyseButton";
import { analyseYoutubeVideo } from "@/actions/analyseYoutubeVideo";

function YoutubeVideoForm() {
  return (
    <div className="w-full max-w-2xl mx-auto ">
      <Form
        action={analyseYoutubeVideo}
        className="flex flex-col sm:flex-row gap-2 items-center"
      >
        <input
          name="url"
          type="text"
          placeholder="Enter YouTube URL"
          className="w-full border rounded-lg px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <AnalyseButton />
      </Form>
    </div>
  );
}

export default YoutubeVideoForm;
