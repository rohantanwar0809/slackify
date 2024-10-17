import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateChannelModal } from "../store/use-create-channel-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateChannel } from "../api/use-create-channel";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

export const CreateChannelModal = () => {
  const [isOpen, setOpen] = useCreateChannelModal();

  const { mutate: createChannel, isPending } = useCreateChannel();

  const workspaceId = useWorkspaceId();

  const [name, setName] = useState("");

  const handleClose = () => {
    setName("");
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //make sure channel name does not contain spaces & parse with '-' instead
    const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
    setName(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createChannel(
      { name, workspaceId },
      {
        onSuccess: () => {
          //TODO : redirect to the newly created channel
          handleClose();
        },
      }
    );
    handleClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new channel</DialogTitle>
          <DialogDescription>
            Channels are where your team communicates. They’re best when
            organized around a topic — #marketing, for example.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            value={name}
            disabled={isPending}
            onChange={handleChange}
            required
            autoFocus
            minLength={3}
            maxLength={80}
            placeholder="e.g. marketing"
          />
          <div className="flex justify-end">
            <Button disabled={isPending}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
