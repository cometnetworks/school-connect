import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Bell, Info, AlertCircle, ChevronRight, User, CalendarDays, TrendingUp, GraduationCap } from 'lucide-react';

export default function HomePage() {
    const navigate = useNavigate();
    const [readComms, setReadComms] = useState([]);

    // Get auth data from session
    const parentIdStr = localStorage.getItem('schoolConnectParentId');
    const parentFirstName = localStorage.getItem('schoolConnectParentName')?.split(' ')[0] || 'Padre';

    const dashboard = useQuery(api.queries.getParentDashboard, parentIdStr ? { parentId: parentIdStr } : "skip");
    const communications = useQuery(api.queries.getCommunications);

    const markAsReadMutation = useMutation(api.mutations.markCommunicationAsRead);

    if (dashboard === undefined || communications === undefined) {
        return <div className="p-6 text-center text-gray-500 mt-20">Cargando información...</div>;
    }

    const { students: myChildren, myGrades, upcomingExams, activeSanctions } = dashboard;

    // Aggregate Data
    const unreadComms = communications.filter(c => parentIdStr && !c.readBy.includes(parentIdStr) && !readComms.includes(c._id));
    const averageGrade = myGrades.length > 0 ? (myGrades.reduce((acc, curr) => acc + curr.average, 0) / myGrades.length).toFixed(1) : 0;

    const markAsRead = (id) => {
        setReadComms([...readComms, id]);
        if (parentIdStr) {
            markAsReadMutation({ communicationId: id, parentId: parentIdStr });
        }
    };

    const formatDate = (dateString) => {
        const d = new Date(dateString);
        return `${d.getDate()} ${d.toLocaleString('es-MX', { month: 'short' })}`;
    }

    return (
        <div className="bg-[#F3F4F6] min-h-screen pb-10">

            {/* HEADER SECTION */}
            <div className="bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-purple)] pt-12 pb-16 rounded-b-[2rem] px-6 text-white shadow-md">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Hola, {parentFirstName}</h1>
                        <p className="opacity-80 text-sm mt-1">Panel General</p>
                    </div>
                    <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center relative cursor-pointer active:scale-95 transition-transform" onClick={() => document.getElementById('avisos').scrollIntoView({ behavior: 'smooth' })}>
                        <Bell size={20} />
                        {unreadComms.length > 0 && (
                            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-[var(--color-brand-purple)]"></span>
                        )}
                    </div>
                </div>
            </div>

            <div className="px-6 -mt-10 relative z-10 space-y-6">

                {/* KPI DASHBOARD */}
                <div className="flex gap-4">
                    <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center items-center animate-[slideUp_0.2s_ease-out]">
                        <div className="bg-blue-50 text-blue-600 p-2 rounded-full mb-2">
                            <TrendingUp size={20} />
                        </div>
                        <span className="text-2xl font-bold text-gray-800">{averageGrade}</span>
                        <span className="text-xs text-gray-500 text-center font-medium mt-1">Promedio Familiar</span>
                    </div>
                    <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center items-center animate-[slideUp_0.3s_ease-out]">
                        <div className="bg-purple-50 text-purple-600 p-2 rounded-full mb-2">
                            <GraduationCap size={20} />
                        </div>
                        <span className="text-2xl font-bold text-gray-800">{myChildren.length}</span>
                        <span className="text-xs text-gray-500 text-center font-medium mt-1">Hijos Inscritos</span>
                    </div>
                </div>

                {/* UPCOMING EXAMS SECTION */}
                {upcomingExams.length > 0 && (
                    <section className="animate-[slideUp_0.4s_ease-out]">
                        <h2 className="text-lg font-bold text-gray-800 mb-3 ml-1 flex items-center gap-2">
                            <CalendarDays size={18} className="text-[var(--color-brand-blue)]" /> Próximos Exámenes
                        </h2>
                        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                            {upcomingExams.map(exam => {
                                const student = myChildren.find(c => c._id === exam.studentId);
                                return (
                                    <div key={exam._id} className="min-w-[140px] bg-white rounded-2xl p-4 shadow-sm border border-gray-100 border-l-4 border-l-orange-400">
                                        <p className="text-orange-500 text-xs font-bold">{formatDate(exam.date)}</p>
                                        <p className="text-gray-900 font-semibold text-sm mt-1 truncate">{exam.subject}</p>
                                        <p className="text-gray-500 text-[10px] mt-1">{student?.name.split(' ')[0]} • {exam.type}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                )}

                {/* MIS HIJOS SECTION */}
                <section className="animate-[slideUp_0.5s_ease-out]">
                    <h2 className="text-lg font-bold text-gray-800 mb-3 ml-1">Perfiles de Alumnos</h2>
                    <div className="space-y-3">
                        {myChildren.map(student => {
                            const activeSanctionsCount = activeSanctions.filter(s => s.studentId === student._id).length;

                            return (
                                <div
                                    key={student._id}
                                    onClick={() => navigate(`/student/${student._id}`)}
                                    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow active:scale-[0.98]"
                                >
                                    <img src={student.photoUrl} alt={student.name} className="w-14 h-14 rounded-full border-2 border-[var(--color-brand-light)] object-cover bg-gray-100" />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-900 truncate">{student.name}</h3>
                                        <p className="text-xs text-gray-500 truncate">{student.grade} "{student.group}" • {student.shift}</p>

                                        <div className="flex gap-2 mt-2">
                                            {activeSanctionsCount > 0 ? (
                                                <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                                                    <AlertCircle size={10} /> {activeSanctionsCount} alerta
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 bg-green-50 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                                                    <User size={10} /> Sin alertas
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <ChevronRight size={20} className="text-gray-300 flex-shrink-0" />
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* COMUNICADOS SECTION */}
                <section id="avisos" className="animate-[slideUp_0.6s_ease-out]">
                    <h2 className="text-lg font-bold text-gray-800 mb-3 ml-1 flex items-center gap-2">
                        Bandeja de Avisos {unreadComms.length > 0 && <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{unreadComms.length}</span>}
                    </h2>
                    {unreadComms.length === 0 ? (
                        <div className="text-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm text-gray-400 text-sm">
                            Estás al día. No tienes avisos pendientes.
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {unreadComms.map(comm => (
                                <div key={comm._id} className="bg-white rounded-2xl p-4 shadow-sm border border-l-4 border-l-[var(--color-brand-blue)] border-y-gray-100 border-r-gray-100 animate-[fadeIn_0.4s_ease-out]">
                                    <div className="flex gap-3 items-start">
                                        <div className="mt-0.5 text-[var(--color-brand-blue)] flex-shrink-0 bg-blue-50 p-1.5 rounded-lg">
                                            <Info size={16} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-gray-800 text-sm truncate">{comm.title}</h4>
                                            <p className="text-gray-600 text-xs mt-1.5 leading-relaxed break-words">{comm.message}</p>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); markAsRead(comm._id); }}
                                                className="mt-3 text-[11px] font-bold text-[var(--color-brand-purple)] bg-purple-50 px-3 py-1.5 rounded-lg active:bg-purple-100 transition-colors w-max block"
                                            >
                                                ✓ Marcar de enterado
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
