import { NextRequest, NextResponse } from "next/server";
import { z, prettifyError } from "zod/v4";
import crypto from "crypto";
import { and, count, eq, lt } from "drizzle-orm";
import { waitUntil } from "@vercel/functions";
import { db } from "@/db";
import { apiUsageTable, waitlistMembersTable } from "@/db/schema";
import { captureException } from "@sentry/nextjs";
import { getIpAddress } from "@/lib/server-utils";

const validator = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.email("Please enter a valid email address"),
});

const PER_MINUTE_REQUEST_LIMIT =
  process.env.NODE_ENV === "development" ? 100 : 10;

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const result = validator.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: prettifyError(result.error),
        },
        { status: 400 },
      );
    }

    const clientIp = getIpAddress(request);

    if (!clientIp) {
      return NextResponse.json(
        {
          success: false,
          message: "IP address not found",
        },
        { status: 400 },
      );
    }

    const ipHash = crypto.createHash("sha256").update(clientIp).digest("hex");

    // get the number of api requests in the last 1 minute
    const [apiUsage] = await db
      .select({ count: count() })
      .from(apiUsageTable)
      .where(
        and(
          eq(apiUsageTable.ipHash, ipHash),
          lt(apiUsageTable.timestamp, new Date(Date.now() - 60000)),
        ),
      );

    if (apiUsage.count > PER_MINUTE_REQUEST_LIMIT) {
      return NextResponse.json(
        {
          success: false,
          message: `You have tried to register too many times. Please try again in a minute.`,
        },
        { status: 429 },
      );
    }

    const logPromise = db.insert(apiUsageTable).values({
      ipHash,
      endpoint: "/api/register",
    });

    if (process.env.NODE_ENV === "production") {
      waitUntil(logPromise);
    } else {
      await logPromise;
    }

    const [waitlistMember] = await db
      .insert(waitlistMembersTable)
      .values({
        name: result.data.name,
        email: result.data.email,
      })
      .onConflictDoNothing()
      .returning();

    if (!waitlistMember) {
      return NextResponse.json(
        {
          success: true,
          message: "You're already in the waitlist!",
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: waitlistMember,
        message: "You've been added to the waitlist!",
      },
      { status: 200 },
    );
  } catch (error) {
    captureException(error);
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
};
