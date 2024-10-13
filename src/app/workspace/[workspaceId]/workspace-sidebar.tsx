import { useCurrentMember } from "@/app/features/members/api/use-current-member";
import { useGetWorkspace } from "@/hooks/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { AlertTriangle, Loader } from "lucide-react";
import { WorkspaceHeader } from "./workspace-header";

export const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();
  const { data: currentMember, isLoading: currentMemberLoading } =
    useCurrentMember({ workspaceId });
  const { workspace, isLoading: workspaceLoading } =
    useGetWorkspace(workspaceId);
  if (currentMemberLoading || workspaceLoading) {
    return (
      <div className="flex flex-col bg-[#5E2C5F] items-center justify-center h-full">
        <Loader className="size-5 animate-spin text-white" />
      </div>
    );
  }

  if (!workspace || !currentMember) {
    console.log({ workspace, currentMember });

    return (
      <div className="flex flex-col gap-y-2 bg-[#5E2C5F] items-center justify-center h-full">
        <AlertTriangle className="size-5 text-white" />
        <p className="text-white text-sm">
          You are not a member of this workspace, or the workspace does not
          exist.
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-col bg-[#5E2C5F] h-full">
      <WorkspaceHeader
        workspace={workspace}
        isAdmin={currentMember.role === "admin"}
      />
    </div>
  );
};
