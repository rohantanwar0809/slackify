import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";

interface UseGetChannelsArgs {
  workspaceId: Id<"workspaces">;
}

export const useGetChannels = (args: UseGetChannelsArgs) => {
  const data = useQuery(api.channels.get, args);
  const isLoading = data === undefined;

  return {
    data,
    isLoading,
  };
};
