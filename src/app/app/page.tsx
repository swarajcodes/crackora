import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/drizzle/db";
import { JobInfoTable } from "@/drizzle/schema";
import { getJobInfoUserTag } from "@/features/jobinfos/dbCache";
import { getJobInfoTag } from "@/lib/dataCache";
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser";
import { desc, eq } from "drizzle-orm";
import { Loader2Icon } from "lucide-react";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { Suspense } from "react";

export default function AppPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen-header flex items-center justify-center">
          <Loader2Icon className="size-24 animate-spin" />
        </div>
      }
    >
      <JobInfos />
    </Suspense>
  );
}

async function JobInfos() {
  const { userId, redirectToSignIn } = await getCurrentUser();

  if (userId == null) return redirectToSignIn();

  const jobInfos = await getJobInfos(userId);

  if (jobInfos.length === 0) {
    return <NoJobInfos />;
  }

  return null
}

function NoJobInfos() {
  return (
    <div className="container my-4 max-w-5xl font-mono">
      <h1 className="text-3xl md:text-4xl lg:text-5xl mb-4">
        Welcome to Crackora!
      </h1>
      <p className="text-muted-foreground mb-8">
        Enter Your Job Description in as much Detail and Let AI do the Magic for
        ya!
      </p>
      <Card>
        <CardContent>
          {/* <JobInfoForm /> */}
        </CardContent>
      </Card>
    </div>
  );
}

async function getJobInfos(userId: string) {
  "use cache";
  cacheTag(getJobInfoUserTag(userId));
  return db.query.JobInfoTable.findMany({
    where: eq(JobInfoTable.userId, userId),
    orderBy: desc(JobInfoTable.updatedAt),
  });
}
