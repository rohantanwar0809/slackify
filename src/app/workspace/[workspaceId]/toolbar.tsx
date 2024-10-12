import { Button } from "@/components/ui/button";
import { useGetWorkspace } from "@/hooks/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Info, Search } from "lucide-react";

export const Toolbar = () => {
  const workspaceId = useWorkspaceId();
  const { workspace } = useGetWorkspace(workspaceId);

  return (
    <nav className="bg-[#481349] flex items-center justify-between h-10 p-1.5">
      <div className="min-w-[280px] max-[642px] grow-[2] shrink">
        <Button
          size="sm"
          className="bg-accent/25 hover:bg-accent-25 w-full justify-start h-7 px-2"
        >
          <Search className="size-4 text-white mr-2" />
          <span>Search {workspace?.name} Workspace</span>
        </Button>
      </div>
      <div className="ml-auto flex-1 flex items-center justify-center">
        <Button variant="transparent" size="iconSm">
          <Info className="size-5 text-white" />
        </Button>
      </div>
    </nav>
  );
};
