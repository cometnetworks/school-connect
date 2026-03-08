"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, GraduationCap, Send, LayoutDashboard, Settings, LogOut, Bell } from 'lucide-react';

export default function DashboardLayout({ children, title = "Vista General" }) {
    const pathname = usePathname();

    const navItems = [
        { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/students', icon: Users, label: 'Alumnos' },
        { path: '/communications', icon: Send, label: 'Comunicados' },
        { path: '/settings', icon: Settings, label: 'Configuración' },
    ];

    return (
        <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
                <div className="h-16 flex items-center px-6 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8">
                            <img src="/logo-schoolconnect.png" alt="Logo" className="w-full h-full object-contain" />
                        </div>
                        <div className="font-bold text-blue-600 text-base leading-tight">
                            Instituto<br /><span className="text-sm font-semibold opacity-70">Alina</span>
                        </div>
                    </div>
                </div>
                <nav className="flex-1 p-4 flex flex-col gap-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                <Icon size={18} /> {item.label}
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">A</div>
                        <div>
                            <p className="text-sm font-bold">Adminstrador</p>
                            <p className="text-xs text-gray-500">Colegio Yucatán</p>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            localStorage.removeItem("schoolConnectAdminAuth");
                            window.location.href = "/login";
                        }}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium text-sm transition-colors"
                    >
                        <LogOut size={16} /> Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
                    <h1 className="font-semibold text-lg">{title}</h1>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-full relative transition-colors">
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
                    {children}
                </div>
            </main>
        </div>
    );
}
