"use client";

import { useGetWorkspace } from "@/hooks/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

const WorkspaceIdPage = () => {
  const workspaceId = useWorkspaceId();
  const { workspace, isLoading } = useGetWorkspace(workspaceId);
  return <div>{JSON.stringify(workspace)}</div>;
};

export default WorkspaceIdPage;
