import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const markCommunicationAsRead = mutation({
    args: { communicationId: v.id("communications"), parentId: v.id("parents") },
    handler: async (ctx, args) => {
        const comm = await ctx.db.get(args.communicationId);
        if (!comm) throw new Error("Communication not found");

        // Prevent duplicates
        if (!comm.readBy.includes(args.parentId)) {
            await ctx.db.patch(args.communicationId, {
                readBy: [...comm.readBy, args.parentId],
            });
        }
    },
});
