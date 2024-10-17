import { useGetChannels } from "@/app/features/channels/api/use-get-channels";
import { useCurrentMember } from "@/app/features/members/api/use-current-member";
import { useGetMembers } from "@/app/features/members/api/use-get-members";
import { useGetWorkspace } from "@/hooks/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import {
  AlertTriangle,
  HashIcon,
  Loader,
  MessageSquareText,
  SendHorizonal,
} from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { WorkspaceHeader } from "./workspace-header";
import { WorkspaceSection } from "./workspace-section";
import { UserItem } from "./user-item";
import { useCreateChannelModal } from "@/app/features/channels/store/use-create-channel-modal";

export const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();

  const [_createChannelModalState, setCreateChannelModalState] =
    useCreateChannelModal();

  const { data: currentMember, isLoading: currentMemberLoading } =
    useCurrentMember({ workspaceId });
  const { workspace, isLoading: workspaceLoading } =
    useGetWorkspace(workspaceId);

  const { data: channels, isLoading: channelsLoading } = useGetChannels({
    workspaceId,
  });

  const { data: members, isLoading: membersLoading } = useGetMembers({
    workspaceId,
  });

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
      <div className="flex flex-col px-2 mt-3">
        <SidebarItem label="Threads" icon={MessageSquareText} id="threads" />
        <SidebarItem label="Drafts & Sent" icon={SendHorizonal} id="drafts" />
      </div>
      <WorkspaceSection
        label="Channels"
        hint="New Channel"
        onNew={
          currentMember.role === "admin"
            ? () => setCreateChannelModalState(true)
            : undefined
        }
      >
        {channels?.map((item) => (
          <SidebarItem
            key={item._id}
            icon={HashIcon}
            label={item.name}
            id={item._id}
          />
        ))}
      </WorkspaceSection>
      <WorkspaceSection
        label="Direct Messages"
        hint="New direct message"
        onNew={() => {}}
      >
        {members?.map((item) => (
          <UserItem
            key={item._id}
            id={item._id}
            label={item.user.name}
            image={item.user.image}
          />
        ))}
      </WorkspaceSection>
    </div>
  );
};
