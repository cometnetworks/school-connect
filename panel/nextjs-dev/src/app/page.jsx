import React from 'react';
import { Users, GraduationCap, CalendarOff, AlertTriangle, Send, Bell, LayoutDashboard, Settings, LogOut } from 'lucide-react';
import { mockStudents, mockStats } from '../../lib/mockData';
import DashboardLayout from '../components/DashboardLayout';

export default function AdminDashboard() {
    return (
        <DashboardLayout title="Vista General">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { title: "Total Alumnos", value: mockStats.totalStudents, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
                        { title: "Asistencia Media", value: mockStats.attendanceRate, icon: CalendarOff, color: "text-green-600", bg: "bg-green-50" },
                        { title: "Promedio Escolar", value: mockStats.averageGrade, icon: GraduationCap, color: "text-purple-600", bg: "bg-purple-50" },
                        { title: "Sanciones Activas", value: mockStats.activeSanctions, icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
                    ].map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                                    <Icon size={24} />
                                </div>
                                <div>
                                    <p className="font-semibold tracking-tight text-2xl">{stat.value}</p>
                                    <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Quick Actions & Recent */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="font-bold text-lg">Alumnos Destacados / Alertas</h2>
                            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Ver todo</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
                                        <th className="p-4 font-semibold">Alumno</th>
                                        <th className="p-4 font-semibold">Grado</th>
                                        <th className="p-4 font-semibold text-center">Promedio</th>
                                        <th className="p-4 font-semibold text-center">Faltas</th>
                                        <th className="p-4 font-semibold text-center">Sanciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {mockStudents.map(s => (
                                        <tr key={s.id} className="hover:bg-gray-50/20 transition-colors">
                                            <td className="p-4 font-medium text-gray-900">{s.name}</td>
                                            <td className="p-4 text-gray-500 text-sm">{s.grade} "{s.group}"</td>
                                            <td className="p-4 text-center text-sm font-semibold">{s.average}</td>
                                            <td className="p-4 text-center text-sm text-gray-500">{s.absences}</td>
                                            <td className="p-4 text-center">
                                                {s.sanctions > 0 ? (
                                                    <span className="bg-red-50 text-red-600 px-2.5 py-1 rounded-md text-xs font-bold inline-block min-w-[2rem]">{s.sanctions}</span>
                                                ) : (
                                                    <span className="text-gray-400 text-sm">-</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Quick Communication Form */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
                        <h2 className="font-bold text-lg mb-4">Enviar Comunicado Rápido</h2>
                        <div className="space-y-4 flex-1">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Destinatarios</label>
                                <select className="w-full border border-gray-200 px-3 py-2 rounded-lg text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all">
                                    <option>Todos los padres</option>
                                    <option>Padres de Nivel Primaria</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Título</label>
                                <input type="text" placeholder="Ej. Suspensión de labores" className="w-full border border-gray-200 px-3 py-2 rounded-lg text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Mensaje</label>
                                <textarea rows="4" placeholder="Escribe el mensaje aquí..." className="w-full border border-gray-200 px-3 py-2 rounded-lg text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"></textarea>
                            </div>
                        </div>
                        <button className="w-full mt-6 bg-[var(--color-brand-purple,#7c3aed)] hover:bg-[#6d28d9] text-white font-semibold py-2.5 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2">
                            <Send size={18} /> Enviar a padres
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
