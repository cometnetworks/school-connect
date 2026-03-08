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

// 9. Get everything needed for the parent dashboard
export const getParentDashboard = query({
    args: { parentId: v.id("parents") },
    handler: async (ctx, args) => {
        const students = await ctx.db
            .query("students")
            .filter((q) => q.eq(q.field("parentId"), args.parentId))
            .collect();

        const studentIds = students.map(s => s._id);

        const allGrades = await ctx.db.query("grades").collect();
        const myGrades = allGrades.filter(g => studentIds.includes(g.studentId));

        const allExams = await ctx.db.query("exams").collect();
        const upcomingExams = allExams.filter(e => studentIds.includes(e.studentId)).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        const allSanctions = await ctx.db.query("sanctions").collect();
        const mySanctions = allSanctions.filter(s => studentIds.includes(s.studentId) && s.status === 'vigente');

        return {
            students,
            myGrades,
            upcomingExams,
            activeSanctions: mySanctions,
        };
    },
});

// 10. Get everything needed for Student Profile
export const getStudentProfile = query({
    args: { studentId: v.id("students") },
    handler: async (ctx, args) => {
        const student = await ctx.db.get(args.studentId);
        const grades = await ctx.db.query("grades").filter(q => q.eq(q.field("studentId"), args.studentId)).collect();
        const absences = await ctx.db.query("absences").filter(q => q.eq(q.field("studentId"), args.studentId)).collect();
        const sanctions = await ctx.db.query("sanctions").filter(q => q.eq(q.field("studentId"), args.studentId)).collect();

        return { student, grades, absences, sanctions };
    }
});

// 11. Get all students (for admin selectors)
export const getStudents = query({
    handler: async (ctx) => {
        return await ctx.db.query("students").collect();
    },
});
