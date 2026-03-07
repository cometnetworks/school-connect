import { query } from "./_generated/server";
import { v } from "convex/values";

// 1. Get children for a specific parent
export const getStudentsByParent = query({
    args: { parentId: v.id("parents") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("students")
            .filter((q) => q.eq(q.field("parentId"), args.parentId))
            .collect();
    },
});

// 2. Get a single student by ID
export const getStudent = query({
    args: { studentId: v.id("students") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.studentId);
    },
});

// 3. Get grades for a specific student
export const getGradesByStudent = query({
    args: { studentId: v.id("students") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("grades")
            .filter((q) => q.eq(q.field("studentId"), args.studentId))
            .collect();
    },
});

// 4. Get absences for a specific student
export const getAbsencesByStudent = query({
    args: { studentId: v.id("students") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("absences")
            .filter((q) => q.eq(q.field("studentId"), args.studentId))
            .collect();
    },
});

// 5. Get sanctions for a specific student
export const getSanctionsByStudent = query({
    args: { studentId: v.id("students") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("sanctions")
            .filter((q) => q.eq(q.field("studentId"), args.studentId))
            .collect();
    },
});

// 6. Get all communications (filter by target in frontend for now to simplify)
export const getCommunications = query({
    handler: async (ctx) => {
        return await ctx.db.query("communications").order("desc").collect();
    },
});

// 7. Get exams for a specific student
export const getExamsByStudent = query({
    args: { studentId: v.id("students") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("exams")
            .filter((q) => q.eq(q.field("studentId"), args.studentId))
            .collect();
    },
});

// 8. Get all parents (for demo mock login)
export const getParents = query({
    handler: async (ctx) => {
        return await ctx.db.query("parents").collect();
    },
});
