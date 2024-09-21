import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, { name }) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const joinCode = Math.random().toString(36).substring(2, 8);

    const workspaceId = await ctx.db.insert("workspaces", {
      name,
      userId,
      joinCode,
    });

    return workspaceId;
  },
});

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("workspaces").collect();
  },
});
