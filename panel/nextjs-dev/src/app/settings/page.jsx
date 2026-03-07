"use client";

import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Save, Building2, Phone, Mail, Globe, MapPin, BellRing, Settings2 } from 'lucide-react';

export default function SettingsPage() {
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <DashboardLayout title="Configuración Institucional">
            <div className="max-w-4xl mx-auto space-y-8">

                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Perfil del Colegio</h2>
                        <p className="text-gray-500 text-sm mt-1">Administra los datos públicos que verán los padres en la app.</p>
                    </div>
                    <button
                        onClick={handleSave}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-xl transition-colors flex items-center gap-2 shadow-sm"
                    >
                        {saved ? 'Guardado exitosamente' : <><Save size={18} /> Guardar Cambios</>}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Col - Navigation */}
                    <div className="md:col-span-1 space-y-2">
                        <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl font-medium text-left transition-colors">
                            <Building2 size={18} /> Datos Generales
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium text-left transition-colors">
                            <BellRing size={18} /> Notificaciones
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium text-left transition-colors">
                            <Settings2 size={18} /> Avanzado
                        </button>
                    </div>

                    {/* Right Col - Form */}
                    <div className="md:col-span-2 space-y-6 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">

                        <div className="space-y-4">
                            <h3 className="font-bold text-lg border-b border-gray-100 pb-2 mb-4">Información de Contacto</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Nombre de la Institución</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                            <Building2 size={16} />
                                        </div>
                                        <input type="text" defaultValue="Colegio Yucatán" className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Teléfono Principal</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                            <Phone size={16} />
                                        </div>
                                        <input type="tel" defaultValue="(999) 123 4567" className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Correo Electrónico</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                            <Mail size={16} />
                                        </div>
                                        <input type="email" defaultValue="contacto@colegioyucatan.edu.mx" className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Sitio Web</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                            <Globe size={16} />
                                        </div>
                                        <input type="url" defaultValue="www.colegioyucatan.edu.mx" className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Dirección Completa</label>
                                <div className="relative">
                                    <div className="absolute top-3 left-3 flex text-gray-400">
                                        <MapPin size={16} />
                                    </div>
                                    <textarea rows="3" defaultValue="Calle 60 #123 x 45 y 47, Centro, 97000 Mérida, Yuc." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"></textarea>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
}
