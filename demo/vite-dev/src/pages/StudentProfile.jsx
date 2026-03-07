import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ChevronLeft, GraduationCap, CalendarOff, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';

export default function StudentProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('notas');

    const profileData = useQuery(api.queries.getStudentProfile, { studentId: id });

    if (profileData === undefined) return <div className="p-6 text-center text-gray-500 mt-20">Cargando perfil...</div>;
    if (profileData.student === null) return <div className="p-6 text-center text-red-500 mt-20">Alumno no encontrado</div>;

    const { student, grades, absences, sanctions } = profileData;

    const tabs = [
        { id: 'notas', label: 'Notas', icon: GraduationCap },
        { id: 'faltas', label: 'Faltas', icon: CalendarOff },
        { id: 'sanciones', label: 'Sanciones', icon: AlertTriangle },
    ];

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-20">
                <div className="flex items-center px-4 py-4">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-500 hover:text-gray-900 active:bg-gray-100 rounded-full transition-colors">
                        <ChevronLeft size={24} />
                    </button>
                    <div className="flex-1 flex justify-center">
                        <h1 className="font-semibold text-gray-900">Perfil del Alumno</h1>
                    </div>
                    <div className="w-8"></div>
                </div>

                <div className="flex flex-col items-center pb-6">
                    <img src={student.photoUrl} alt={student.name} className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover bg-gray-100" />
                    <h2 className="text-xl font-bold text-gray-900 mt-3">{student.name}</h2>
                    <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full mt-2">
                        {student.grade} "{student.group}"
                    </span>
                </div>

                {/* Tabs */}
                <div className="flex px-4 gap-2 overflow-x-auto no-scrollbar pb-2">
                    {tabs.map(tab => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap flex-1 justify-center
                  ${isActive ? 'bg-[var(--color-brand-blue)] text-white shadow-md' : 'bg-gray-100 text-gray-600'}`}
                            >
                                <Icon size={16} />
                                {tab.label}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Content */}
            <div className="p-5 animate-[fadeIn_0.3s_ease-out]">

                {/* Notas Tab */}
                {activeTab === 'notas' && (
                    <div className="space-y-4">
                        <div className="bg-gradient-to-br from-[var(--color-brand-blue)] to-blue-600 rounded-2xl p-5 text-white shadow-md">
                            <p className="text-blue-100 text-sm font-medium">Promedio General</p>
                            <h3 className="text-4xl font-bold mt-1">
                                {(grades.reduce((acc, curr) => acc + curr.average, 0) / grades.length || 0).toFixed(1)}
                            </h3>
                        </div>

                        <h4 className="font-bold text-gray-800 ml-1 mt-6">Desglose por Materia</h4>
                        <div className="space-y-3">
                            {grades.map(g => (
                                <div key={g._id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-50 text-[var(--color-brand-blue)] rounded-lg">
                                            <FileText size={18} />
                                        </div>
                                        <span className="font-semibold text-gray-800">{g.subject}</span>
                                    </div>
                                    <div className="flex items-end gap-3 text-right">
                                        <div className="text-xs text-gray-400 flex flex-col items-center">
                                            <span>T1</span>
                                            <span className="font-medium text-gray-600">{g.trimester1}</span>
                                        </div>
                                        <div className="text-xs text-gray-400 flex flex-col items-center">
                                            <span>T2</span>
                                            <span className="font-medium text-gray-600">{g.trimester2}</span>
                                        </div>
                                        <div className="text-xs text-[var(--color-brand-blue)] flex flex-col items-center ml-2 pl-2 border-l border-gray-100">
                                            <span className="font-bold">PRO</span>
                                            <span className="font-bold text-lg leading-none">{g.average}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Faltas Tab */}
                {activeTab === 'faltas' && (
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center">
                                <span className="block text-2xl font-bold text-gray-800">{absences.length}</span>
                                <span className="text-xs text-gray-500 font-medium">Total Faltas</span>
                            </div>
                            <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center">
                                <span className="block text-2xl font-bold text-green-600">{absences.filter(a => a.justified).length}</span>
                                <span className="text-xs text-green-600/70 font-medium">Justificadas</span>
                            </div>
                        </div>

                        <div className="space-y-3 mt-6">
                            {absences.map(a => (
                                <div key={a._id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 items-start">
                                    <div className={`p-2 rounded-lg mt-0.5 ${a.justified ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                                        <CalendarOff size={18} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800 text-sm">{new Date(a.date).toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                        <p className="text-xs font-medium mt-1">
                                            {a.justified ? (
                                                <span className="text-green-600 flex items-center gap-1"><CheckCircle2 size={12} /> Justificada: {a.reason}</span>
                                            ) : (
                                                <span className="text-orange-600">No Justificada</span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {absences.length === 0 && <p className="text-center text-gray-500 text-sm mt-8">No hay inasistencias registradas.</p>}
                        </div>
                    </div>
                )}

                {/* Sanciones Tab */}
                {activeTab === 'sanciones' && (
                    <div className="space-y-4">
                        {sanctions.length === 0 ? (
                            <div className="text-center p-8 bg-green-50/50 rounded-3xl border border-green-100 mt-4">
                                <CheckCircle2 size={40} className="mx-auto text-green-400 mb-3" />
                                <h3 className="font-bold text-green-800">Historial limpio</h3>
                                <p className="text-sm text-green-600/80 mt-1">El alumno no cuenta con sanciones registradas.</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {sanctions.map(s => {
                                    const isVigente = s.status === 'vigente';
                                    return (
                                        <div key={s._id} className={`bg-white p-4 rounded-2xl shadow-sm border flex flex-col gap-2 ${isVigente ? 'border-red-200' : 'border-gray-100 opacity-70'}`}>
                                            <div className="flex justify-between items-start">
                                                <div className="flex items-center gap-2">
                                                    <AlertTriangle size={16} className={isVigente ? 'text-red-500' : 'text-gray-400'} />
                                                    <h4 className="font-bold text-gray-800 text-sm">{s.type}</h4>
                                                </div>
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide ${isVigente ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-500'}`}>
                                                    {s.status}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 font-medium">{new Date(s.date).toLocaleDateString('es-MX')}</p>
                                            <div className="bg-gray-50 p-3 rounded-lg mt-1 border border-gray-100">
                                                <p className="text-sm text-gray-700 leading-relaxed">{s.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
