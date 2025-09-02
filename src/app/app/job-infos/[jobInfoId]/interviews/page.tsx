import { JobInfoBackLink } from "@/features/jobInfos/components/JobInfoBackLink";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";

export default async function InterviewsPage({
  params,
}: {
  params: Promise<{ jobInfoId: string }>;
}) {
  const { jobInfoId } = await params;

  return (
    <div className="container py-4 gap-4 h-screen-header max-w-7xl flex flex-col items-start">
      <JobInfoBackLink jobInfoId={jobInfoId} />
      <Suspense
        fallback={<Loader2Icon className="size-24 animate-spin mx-auto" />}
      >
        <SuspendedPage jobInfoId={jobInfoId} />
      </Suspense>
    </div>
  );
}

async function SuspendedPage({ jobInfoId }: { jobInfoId: string }) {
  return <div>Interview </div>;
}
