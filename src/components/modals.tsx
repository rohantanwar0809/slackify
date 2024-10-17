"use client";

import { CreateChannelModal } from "@/app/features/channels/components/create-channel-modal";
import { CreateWorkspaceModal } from "@/app/features/workspaces/components/create-workspace-modal";

import { useEffect, useState } from "react";

export const Modals = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreateChannelModal />
      <CreateWorkspaceModal />
    </>
  );
};
