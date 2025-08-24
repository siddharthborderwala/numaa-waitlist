import { ipAddress } from "@vercel/functions";
import { NextRequest } from "next/server";

export const getIpAddress = (request: NextRequest) => {
  if (process.env.NODE_ENV === "development") {
    return "127.0.0.1";
  }

  return ipAddress(request);
};
