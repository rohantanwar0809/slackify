"use client";

import { useParams } from "next/navigation";
import { Id } from "../../convex/_generated/dataModel";

export function useWorkspaceId(): Id<"workspaces"> {
  const params = useParams();
  return params.workspaceId as Id<"workspaces">;
}
