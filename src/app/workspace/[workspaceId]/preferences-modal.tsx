import { useRemoveWorkspace } from "@/app/features/workspaces/api/use-remove-workspace";
import { useUpdateWorkspace } from "@/app/features/workspaces/api/use-update-workspace";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useConfirm } from "@/hooks/use-confirm";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface PreferencesModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValue: string;
}

export const PreferencesModal: React.FC<PreferencesModalProps> = ({
  open,
  setOpen,
  initialValue,
}) => {
  const workspaceId = useWorkspaceId();
  const [value, setValue] = useState(initialValue);
  const [editOpen, setEditOpen] = useState(false);
  const { mutate: updateWorkspace, isPending: isUpdatePending } =
    useUpdateWorkspace();
  const { mutate: removeWorkspace, isPending: isRemovePending } =
    useRemoveWorkspace();
  const router = useRouter();
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete workspace",
    "Are you sure you want to delete?"
  );

  const formEditHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateWorkspace(
      {
        id: workspaceId,
        name: value,
      },
      {
        onSuccess: () => {
          router.replace("/");
          toast.success("Workspace name updated successfully");
        },
        onError: (error) => {
          toast.error("Failed to update workspace name");
        },
      }
    );
  };

  const removeWorkspaceHandler = async () => {
    const isConfirmed = await confirm();

    if (!isConfirmed) return;

    removeWorkspace(
      {
        id: workspaceId,
      },
      {
        onSuccess: () => {
          toast.success("Workspace deleted successfully");
          setOpen(false);
        },
        onError: (error) => {
          toast.error("Failed to delete workspace");
        },
      }
    );
  };
  return (
    <>
      <ConfirmDialog />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 bg-gray-50 overflow-hidden">
          <DialogHeader className="p-4 border-b bg-white">
            <DialogTitle>{value}</DialogTitle>
          </DialogHeader>
          <div className="px-4 pb-4 flex flex-col gap-y-2">
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogTrigger asChild>
                <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">Workspace Name</p>
                    <p className="text-sm text-[#1264a3] hover:underline font-semibold">
                      Edit
                    </p>
                  </div>
                  <p className="text-sm">{value}</p>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rename workspace name</DialogTitle>
                </DialogHeader>
                <form className="space-y-4" onSubmit={formEditHandler}>
                  <Input
                    value={value}
                    disabled={isUpdatePending}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Workspace name e.g 'Work','Personal', 'Home'"
                    required
                    autoFocus
                    minLength={3}
                    maxLength={80}
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" disabled={isUpdatePending}>
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button>Save</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <button
              disabled={isRemovePending}
              onClick={removeWorkspaceHandler}
              className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-600"
            >
              <TrashIcon className="size-4" />
              <p>
                <span>Delete workspace</span>
              </p>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
