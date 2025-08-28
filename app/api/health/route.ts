import { NextRequest, NextResponse } from "next/server";

// Define a type for the response body for better type safety
type HealthResponse = {
  status: string;
  message: string;
  timestamp: string;
};

export async function GET(request: NextRequest) {
  // Construct the response object
  const responseBody: HealthResponse = {
    status: "OK",
    message: "Health check passed successfully",
    timestamp: new Date().toISOString(),
  };

  // Return the JSON response with a 200 status code
  return NextResponse.json(responseBody, { status: 200 });
}

// Optional: Export a HEAD handler for health checks that only need the status
export async function HEAD(request: NextRequest) {
  return new NextResponse(null, { status: 200 });
}
