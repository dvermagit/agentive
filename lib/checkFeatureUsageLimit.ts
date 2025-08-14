import { featureFlagEvents } from "@/features/flags";
import { client } from "./schematic";

export async function checkFeatureUsageLimit(
  userId: string,
  eventSubType: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const entitlements = await client.entitlements.getFeatureUsageByCompany({
      keys: {
        id: userId,
      },
    });

    const feature = entitlements.data.features.find(
      (entitlements) => entitlements.feature?.eventSubtype === eventSubType
    );

    if (!feature) {
      return {
        success: false,
        error:
          "This feature is not available on your current plan, please upgrade to continue",
      };
    }

    const { usage, allocation } = feature;

    if (usage === undefined || allocation === undefined) {
      return {
        success: false,

        error: "System Error - Contact Support",
      };
    }

    const hasExceededUsageLimit = usage >= allocation;

    if (hasExceededUsageLimit) {
      const featureName =
        Object.entries(featureFlagEvents).find(
          ([, value]) => value.event === eventSubType
        )?.[0] || eventSubType;

      return {
        success: false,
        error: `You have exceeded the ${featureName} limit. Please upgrade your plan to continue using this feature.`,
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Error checking feature usage limit:", error);
    return {
      success: true,
      error: "Error checking feature usage limit",
    };
  }
}
