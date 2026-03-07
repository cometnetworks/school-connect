export const mockParents = [
    {
        id: "p1",
        name: "Carlos Mendoza",
        email: "carlos.mendoza@email.com",
        phone: "9991234567"
    }
];

export const mockStudents = [
    {
        id: "s1",
        name: "Sofía Mendoza",
        grade: "2º",
        group: "A",
        shift: "Mañana",
        parentId: "p1",
        photoUrl: "https://i.pravatar.cc/150?u=sofia"
    },
    {
        id: "s2",
        name: "Leo Mendoza",
        grade: "5º",
        group: "B",
        shift: "Mañana",
        parentId: "p1",
        photoUrl: "https://i.pravatar.cc/150?u=leo"
    }
];

export const mockGrades = [
    { id: "g1", studentId: "s1", subject: "Matemáticas", trimester1: 9.5, trimester2: 9.0, trimester3: 0, average: 9.25 },
    { id: "g2", studentId: "s1", subject: "Español", trimester1: 8.5, trimester2: 9.0, trimester3: 0, average: 8.75 },
    { id: "g3", studentId: "s1", subject: "Historia", trimester1: 10.0, trimester2: 9.5, trimester3: 0, average: 9.75 },
    { id: "g4", studentId: "s2", subject: "Matemáticas", trimester1: 7.5, trimester2: 8.0, trimester3: 0, average: 7.75 },
    { id: "g5", studentId: "s2", subject: "Español", trimester1: 8.0, trimester2: 8.5, trimester3: 0, average: 8.25 }
];

export const mockAbsences = [
    { id: "a1", studentId: "s1", date: "2025-10-12", justified: true, reason: "Cita médica" },
    { id: "a2", studentId: "s2", date: "2025-10-15", justified: false, reason: "" },
    { id: "a3", studentId: "s2", date: "2025-09-02", justified: true, reason: "Enfermedad" }
];

export const mockSanctions = [
    { id: "sn1", studentId: "s2", date: "2025-10-10", type: "Retardo", severity: "Leve", description: "Llegó 15 minutos tarde después del receso.", status: "cumplida" },
    { id: "sn2", studentId: "s2", date: "2025-10-16", type: "Falta de respeto", severity: "Moderada", description: "Interrumpió constantemente la clase.", status: "vigente" }
];

export const mockCommunications = [
    { id: "c1", title: "Suspensión de clases", message: "Estimados padres, les recordamos que el viernes 20 de octubre no habrá clases por junta de consejo técnico.", date: "2025-10-18T10:00:00", type: "global", readBy: [] },
    { id: "c2", title: "Firma de boletas", message: "La entrega de boletas del primer trimestre será el día 30 de octubre a las 8:00 am en la sala audiovisual.", date: "2025-10-25T09:00:00", type: "global", readBy: ["p1"] },
    { id: "c3", title: "Excursión a Chichén Itzá", message: "Los alumnos de 5º grado tendrán excursión. Entregar permiso firmado.", date: "2025-10-22T14:30:00", type: "group", targetId: "5ºB", readBy: [] }
];

export const mockExams = [
    { id: "e1", studentId: "s1", subject: "Matemáticas", date: "2025-11-05T08:00:00", type: "Mensual" },
    { id: "e2", studentId: "s2", subject: "Historia", date: "2025-11-06T10:00:00", type: "Trimestral" }
];
