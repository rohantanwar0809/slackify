import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useCallback, useMemo, useState } from "react";
import { Id } from "../../../../../convex/_generated/dataModel";

type RequestType = { name: string; workspaceId: Id<"workspaces"> };
type ResponseType = Id<"channels">;

type Options = {
  onSuccess?: (data: ResponseType) => void;
  onError?: (err: Error) => void;
  onSettled?: () => void;
  throError?: boolean;
};

export const useCreateChannel = (options: Options = {}) => {
  const [data, setData] = useState<ResponseType | null>(null);
  const [status, setStatus] = useState<
    "success" | "pending" | "error" | "settled" | null
  >(null);

  const isPending = useMemo(() => status === "pending", [status]);
  const isError = useMemo(() => status === "error", [status]);
  const isSettled = useMemo(() => status === "settled", [status]);
  const isSuccess = useMemo(() => status === "success", [status]);

  const mutation = useMutation(api.channels.create);

  const mutate = useCallback(
    async (values: RequestType, options?: Options) => {
      try {
        setData(null);
        setStatus("pending");

        const response = await mutation(values);
        options?.onSuccess && options.onSuccess(response);
        return response;
      } catch (error) {
        setStatus("error");
        options?.onError && options.onError(error as Error);
        if (options?.throError) {
          throw error;
        }
      } finally {
        setStatus("settled");
        options?.onSettled && options.onSettled();
      }
    },
    [mutation]
  );

  return {
    mutate,
    data,
    status,
    isPending,
    isError,
    isSettled,
    isSuccess,
  };
};
