"use client";

import { useEffect, useMemo } from "react";
import { UserButton } from "./features/auth/components/user-button";
import { useGetWorkspaces } from "./features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModal } from "./features/workspaces/store/use-create-workspace-modal";
import { useRouter } from "next/navigation";

export default function Home() {
  const [open, setOpen] = useCreateWorkspaceModal();
  const { data, isLoading } = useGetWorkspaces();
  const router = useRouter();

  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;
    if (workspaceId) {
      console.log("Workspace ID", workspaceId);
      router.push(`/workspace/${workspaceId}`);
    } else if (!open) {
      setOpen(true);
    }
  }, [workspaceId, isLoading, open, setOpen, router]);

  return (
    <div>
      Logged in
      <UserButton />
    </div>
  );
}
