"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCreateWorkspace } from "../api/use-create-workspace";
import { useCreateWorkspaceModal } from "../store/use-create-workspace-modal";

export const CreateWorkspaceModal = () => {
  const [open, setOpen] = useCreateWorkspaceModal();
  const [name, setName] = useState("");
  const router = useRouter();

  const { mutate, data, error, isPending, isError, isSettled } =
    useCreateWorkspace();

  const handleClose = () => {
    setOpen(false);
    //TODO clear form
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await mutate(
        {
          name,
        },
        {
          onSuccess: (data) => {
            router.push(`/workspaces/${data}`);
          },
        }
      );
    } catch (error) {}
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      {/* <DialogTrigger>
        <button onClick={() => setOpen(true)}>Open</button>
      </DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new workspace</DialogTitle>
          <DialogDescription>
            Workspaces are where you can organize your projects.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={name}
            disabled={isPending}
            required
            autoFocus
            onChange={(e) => setName(e.target.value)}
            minLength={3}
            placeholder="Workspace name e.g 'Work','Personal', 'Home'"
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={false}>
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
