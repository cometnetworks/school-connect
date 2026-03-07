import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  parents: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
  }),
  students: defineTable({
    name: v.string(),
    grade: v.string(),
    group: v.string(),
    shift: v.string(), // "mañana" | "tarde"
    parentId: v.id("parents"), // Reference to the parent
    photoUrl: v.optional(v.string()),
  }),
  grades: defineTable({
    studentId: v.id("students"),
    subject: v.string(),
    trimester1: v.number(),
    trimester2: v.number(),
    trimester3: v.number(),
    average: v.number(),
  }),
  absences: defineTable({
    studentId: v.id("students"),
    date: v.string(), // ISO format
    justified: v.boolean(),
    reason: v.optional(v.string()),
  }),
  sanctions: defineTable({
    studentId: v.id("students"),
    date: v.string(),
    type: v.string(), // e.g., "Retardo", "Falta de respeto"
    severity: v.string(), // "Leve", "Moderada", "Grave"
    description: v.string(),
    status: v.string(), // "vigente" | "cumplida"
  }),
  communications: defineTable({
    title: v.string(),
    message: v.string(),
    date: v.string(),
    type: v.string(), // "global", "group", "individual"
    targetId: v.optional(v.string()), // ID of group or student depending on type
    readBy: v.array(v.id("parents")), // Array of parent IDs who have read it
  }),
  exams: defineTable({
    studentId: v.id("students"),
    subject: v.string(),
    date: v.string(), // ISO String
    type: v.string(), // e.g. "Mensual", "Trimestral"
  }),
});
