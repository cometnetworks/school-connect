import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const markCommunicationAsRead = mutation({
    args: { communicationId: v.id("communications"), parentId: v.id("parents") },
    handler: async (ctx, args) => {
        const comm = await ctx.db.get(args.communicationId);
        if (!comm) throw new Error("Communication not found");

        if (!comm.readBy.includes(args.parentId)) {
            await ctx.db.patch(args.communicationId, {
                readBy: [...comm.readBy, args.parentId],
            });
        }
    },
});

export const createCommunication = mutation({
    args: {
        title: v.string(),
        message: v.string(),
        type: v.string(),
        targetId: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("communications", {
            ...args,
            date: new Date().toISOString(),
            readBy: [],
        });
    },
});

export const bulkUploadStudents = mutation({
    args: {
        students: v.array(v.object({
            name: v.string(),
            grade: v.string(),
            group: v.string(),
            shift: v.string(),
            parentEmail: v.string(),
            parentName: v.string(),
        })),
    },
    handler: async (ctx, args) => {
        for (const studentData of args.students) {
            // Find or create parent
            let parent = await ctx.db
                .query("parents")
                .filter((q) => q.eq(q.field("email"), studentData.parentEmail))
                .unique();

            if (!parent) {
                const parentId = await ctx.db.insert("parents", {
                    name: studentData.parentName,
                    email: studentData.parentEmail,
                });
                parent = { _id: parentId } as any;
            }

            // Insert student
            await ctx.db.insert("students", {
                name: studentData.name,
                grade: studentData.grade,
                group: studentData.group,
                shift: studentData.shift,
                parentId: parent!._id,
            });
        }
    },
});
