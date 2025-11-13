import { NextResponse } from "next/server";
import { count } from "drizzle-orm";
import { db } from "@/db";
import { waitlistMembersTable } from "@/db/schema";
import { captureException } from "@sentry/nextjs";

export const GET = async () => {
  try {
    const [row] = await db
      .select({ count: count() })
      .from(waitlistMembersTable);
    return NextResponse.json(
      { success: true, data: { count: row.count } },
      { status: 200 },
    );
  } catch (error) {
    captureException(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch waitlist count" },
      { status: 500 },
    );
  }
};
