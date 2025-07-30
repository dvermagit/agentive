export enum FeatureFlag {
  TRANSCRIPTION = "transcription",
  IMAGE_GENERATION = "image-generation",
  SCRIPT_GENERATION = "script-generation",
  ANALYSE_VIDEO = "analyse-video",
  TITLE_GENERATION = "title-generations",
}

export const featureFlagEvents: Record<FeatureFlag, { event: string }> = {
  [FeatureFlag.TRANSCRIPTION]: { event: "transcribe" },
  [FeatureFlag.IMAGE_GENERATION]: { event: "generate-image" },
  [FeatureFlag.SCRIPT_GENERATION]: { event: "" },
  [FeatureFlag.ANALYSE_VIDEO]: { event: "analyse-video" },
  [FeatureFlag.TITLE_GENERATION]: { event: "generate-title" },
};
