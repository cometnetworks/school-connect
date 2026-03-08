import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ChevronRight, AlertCircle, User, ArrowLeft } from 'lucide-react';

const MOCK_STUDENTS = [
    {
        _id: "demo_1",
        name: "Sofía Mendoza",
        grade: "2º",
        group: "A",
        shift: "Mañana",
        photoUrl: "https://i.pravatar.cc/150?u=sofia"
    },
    {
        _id: "demo_2",
        name: "Leo Mendoza",
        grade: "5º",
        group: "B",
        shift: "Mañana",
        photoUrl: "https://i.pravatar.cc/150?u=leo"
    }
];

export default function ChildrenPage() {
    const navigate = useNavigate();

    // Get parent ID from session
    const parentIdStr = localStorage.getItem('schoolConnectParentId');

    // Fetch data using the real parent ID
    const studentsQuery = useQuery(api.queries.getStudentsByParent, parentIdStr && parentIdStr.includes('_') ? { parentId: parentIdStr } : "skip");
    const activeSanctionsQuery = useQuery(api.queries.getActiveSanctionsByParent, parentIdStr && parentIdStr.includes('_') ? { parentId: parentIdStr } : "skip");

    const myChildren = (studentsQuery && studentsQuery.length > 0) ? studentsQuery : MOCK_STUDENTS;
    const activeSanctions = activeSanctionsQuery || [];

    return (
        <div className="bg-[#F3F4F6] min-h-screen pb-24">
            {/* Header */}
            <div className="bg-white px-6 py-6 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                        <ArrowLeft size={20} className="text-gray-600" />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900">Instituto Alina</h1>
                </div>
                <div className="w-10 h-10">
                    <img src="/logo-schoolconnect.png" alt="Logo" className="w-full h-full object-contain opacity-80" />
                </div>
            </div>

            <div className="p-6 space-y-4">
                {myChildren.length === 0 ? (
                    <div className="bg-white rounded-3xl p-10 text-center shadow-sm border border-gray-100">
                        <User size={48} className="mx-auto text-gray-200 mb-4" />
                        <p className="text-gray-500">No se encontraron alumnos vinculados a tu cuenta.</p>
                    </div>
                ) : (
                    myChildren.map(student => {
                        const activeSanctionsCount = activeSanctions.filter(s => s.studentId === student._id).length;

                        return (
                            <div
                                key={student._id}
                                onClick={() => navigate(`/student/${student._id}`)}
                                className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex items-center gap-5 cursor-pointer hover:shadow-md transition-all active:scale-[0.98] animate-[fadeIn_0.3s_ease-out]"
                            >
                                <img
                                    src={student.photoUrl || "https://i.pravatar.cc/150"}
                                    alt={student.name}
                                    className="w-16 h-16 rounded-2xl object-cover ring-4 ring-gray-50"
                                />
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-gray-900 text-lg">{student.name}</h3>
                                    <p className="text-sm text-[var(--color-brand-blue)] font-medium mt-0.5">
                                        {student.grade} "{student.group}" • {student.shift}
                                    </p>

                                    <div className="flex gap-2 mt-2.5">
                                        {activeSanctionsCount > 0 ? (
                                            <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 text-[11px] font-bold px-3 py-1 rounded-full">
                                                <AlertCircle size={12} /> {activeSanctionsCount} reporte pendiente
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-600 text-[11px] font-bold px-3 py-1 rounded-full">
                                                <User size={12} /> Sin incidencias
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="h-10 w-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-300">
                                    <ChevronRight size={20} />
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
