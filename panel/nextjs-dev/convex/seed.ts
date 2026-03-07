import { mutation } from "./_generated/server";

export const seedMockData = mutation({
    handler: async (ctx) => {
        // 1. Create Parent
        const parentId = await ctx.db.insert("parents", {
            name: "Carlos Mendoza",
            email: "carlos.mendoza@email.com",
            phone: "9991234567"
        });

        // 2. Create Students
        const student1Id = await ctx.db.insert("students", {
            name: "Sofía Mendoza",
            grade: "2º",
            group: "A",
            shift: "Mañana",
            parentId: parentId,
            photoUrl: "https://i.pravatar.cc/150?u=sofia"
        });

        const student2Id = await ctx.db.insert("students", {
            name: "Leo Mendoza",
            grade: "5º",
            group: "B",
            shift: "Mañana",
            parentId: parentId,
            photoUrl: "https://i.pravatar.cc/150?u=leo"
        });

        // 3. Create Grades
        await ctx.db.insert("grades", { studentId: student1Id, subject: "Matemáticas", trimester1: 9.5, trimester2: 9.0, trimester3: 0, average: 9.25 });
        await ctx.db.insert("grades", { studentId: student1Id, subject: "Español", trimester1: 8.5, trimester2: 9.0, trimester3: 0, average: 8.75 });
        await ctx.db.insert("grades", { studentId: student1Id, subject: "Historia", trimester1: 10.0, trimester2: 9.5, trimester3: 0, average: 9.75 });
        await ctx.db.insert("grades", { studentId: student2Id, subject: "Matemáticas", trimester1: 7.5, trimester2: 8.0, trimester3: 0, average: 7.75 });
        await ctx.db.insert("grades", { studentId: student2Id, subject: "Español", trimester1: 8.0, trimester2: 8.5, trimester3: 0, average: 8.25 });

        // 4. Create Absences
        await ctx.db.insert("absences", { studentId: student1Id, date: "2025-10-12", justified: true, reason: "Cita médica" });
        await ctx.db.insert("absences", { studentId: student2Id, date: "2025-10-15", justified: false });
        await ctx.db.insert("absences", { studentId: student2Id, date: "2025-09-02", justified: true, reason: "Enfermedad" });

        // 5. Create Sanctions
        await ctx.db.insert("sanctions", { studentId: student2Id, date: "2025-10-10", type: "Retardo", severity: "Leve", description: "Llegó 15 minutos tarde después del receso.", status: "cumplida" });
        await ctx.db.insert("sanctions", { studentId: student2Id, date: "2025-10-16", type: "Falta de respeto", severity: "Moderada", description: "Interrumpió constantemente la clase.", status: "vigente" });

        // 6. Create Communications
        await ctx.db.insert("communications", { title: "Suspensión de clases", message: "Estimados padres, les recordamos que el viernes 20 de octubre no habrá clases por junta de consejo técnico.", date: "2025-10-18T10:00:00", type: "global", readBy: [] });
        await ctx.db.insert("communications", { title: "Firma de boletas", message: "La entrega de boletas del primer trimestre será el día 30 de octubre a las 8:00 am en la sala audiovisual.", date: "2025-10-25T09:00:00", type: "global", readBy: [parentId] });
        await ctx.db.insert("communications", { title: "Excursión a Chichén Itzá", message: "Los alumnos de 5º grado tendrán excursión. Entregar permiso firmado.", date: "2025-10-22T14:30:00", type: "group", targetId: "5ºB", readBy: [] });
        // 7. Create Exams
        await ctx.db.insert("exams", { studentId: student1Id, subject: "Matemáticas", date: "2025-11-05T08:00:00", type: "Mensual" });
        await ctx.db.insert("exams", { studentId: student2Id, subject: "Historia", date: "2025-11-06T10:00:00", type: "Trimestral" });

        return {
            success: true,
            message: "Database seeded successfully!",
            parentId
        };
    }
});
