import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

export function useGetWorkspace(id: Id<"workspaces">) {
  const workspace = useQuery(api.workspaces.getById, { id });
  const isLoading = workspace === undefined;
  return { workspace, isLoading };
}
