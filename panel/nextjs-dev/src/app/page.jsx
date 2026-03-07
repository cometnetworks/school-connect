import React from 'react';
import { Users, GraduationCap, CalendarOff, AlertTriangle, Send, Bell, LayoutDashboard, Settings } from 'lucide-react';
import { mockStudents, mockStats } from '../../lib/mockData';

export default function AdminDashboard() {
    return (
        <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
                <div className="h-16 flex items-center px-6 border-b border-gray-200">
                    <div className="flex items-center gap-2 text-blue-600 font-bold text-lg">
                        <GraduationCap size={24} />
                        SchoolConnect
                    </div>
                </div>
                <nav className="flex-1 p-4 flex flex-col gap-1">
                    <a href="#" className="flex items-center gap-3 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium text-sm">
                        <LayoutDashboard size={18} /> Dashboard
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium text-sm transition-colors">
                        <Users size={18} /> Alumnos
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium text-sm transition-colors">
                        <Send size={18} /> Comunicados
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium text-sm transition-colors">
                        <Settings size={18} /> Configuración
                    </a>
                </nav>
                <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">A</div>
                        <div>
                            <p className="text-sm font-bold">Adminstrador</p>
                            <p className="text-xs text-gray-500">Colegio Yucatán</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
                    <h1 className="font-semibold text-lg">Vista General</h1>
                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-colors relative">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 border border-white rounded-full"></span>
                        </button>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2 shadow-sm">
                            <Send size={16} /> Nuevo Aviso
                        </button>
                    </div>
                </header>

                {/* Scrollable Area */}
                <div className="flex-1 overflow-auto p-8">
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
                </div>
            </main>
        </div>
    );
}
