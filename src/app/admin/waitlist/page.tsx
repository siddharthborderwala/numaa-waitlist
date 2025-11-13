import { db } from "@/db";
import { waitlistMembersTable } from "@/db/schema";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

async function getWaitlistMembers() {
  const members = await db
    .select()
    .from(waitlistMembersTable)
    .orderBy(desc(waitlistMembersTable.createdAt));
  return members;
}

export default async function WaitlistPage() {
  const members = await getWaitlistMembers();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-primary mb-2">
            Waitlist Members
          </h1>
          <p className="text-muted-foreground text-lg">
            Total members:{" "}
            <span className="font-semibold text-foreground">
              {members.length}
            </span>
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {members.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-12 text-center text-muted-foreground"
                    >
                      No members yet
                    </td>
                  </tr>
                ) : (
                  members.map((member, index) => (
                    <tr
                      key={member.id}
                      className="hover:bg-accent/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-muted-foreground">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-foreground">
                        {member.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">
                        {member.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {new Date(member.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
