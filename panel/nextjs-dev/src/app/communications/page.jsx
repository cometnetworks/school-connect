"use client";

import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Send, Users, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';

export default function CommunicationsPage() {
    const createComm = useMutation(api.mutations.createCommunication);

    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [type, setType] = useState('general');
    const [status, setStatus] = useState(null); // 'sending', 'success', 'error'

    const handleSend = async (e) => {
        e.preventDefault();
        if (!title || !message) return;

        setStatus('sending');

        try {
            await createComm({
                title,
                message,
                type: type === 'general' ? 'global' : 'group', // Aligning with schema types
                targetId: type === 'specific' ? 'demo-group-id' : undefined
            });

            setStatus('success');
            setTitle('');
            setMessage('');
            setTimeout(() => setStatus(null), 3000);
        } catch (error) {
            setStatus('error');
            console.error(error);
        }
    };

    return (
        <DashboardLayout title="Difusión de Comunicados">
            <div className="max-w-4xl mx-auto space-y-8">

                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Nuevo Aviso</h2>
                        <p className="text-gray-500 text-sm mt-1">Envía notificaciones push y mensajes al tablero de los padres.</p>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="flex flex-col md:flex-row border-b border-gray-100">
                        <button
                            className={`flex-1 p-4 font-semibold text-sm flex items-center justify-center gap-2 transition-colors ${type === 'general' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
                            onClick={() => setType('general')}
                        >
                            <Users size={18} />
                            Aviso General Escolar
                        </button>
                        <button
                            className={`flex-1 p-4 font-semibold text-sm flex items-center justify-center gap-2 transition-colors ${type === 'specific' ? 'bg-purple-50 text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:bg-gray-50'}`}
                            onClick={() => setType('specific')}
                        >
                            <AlertCircle size={18} />
                            Aviso Específico (Por grupo/alumno)
                        </button>
                    </div>

                    <form onSubmit={handleSend} className="p-8 space-y-6">
                        {status === 'success' && (
                            <div className="bg-green-50 text-green-700 p-4 rounded-xl flex items-center gap-3 animate-fade-in-up">
                                <CheckCircle2 size={20} className="text-green-600 flex-shrink-0" />
                                <span className="font-medium text-sm">El comunicado se ha enviado exitosamente a todos los dispositivos móviles.</span>
                            </div>
                        )}

                        {type === 'specific' && (
                            <div className="animate-fade-in-up">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Seleccionar Destino</label>
                                <select className="w-full border border-gray-200 px-4 py-3 rounded-xl bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-sm font-medium text-gray-700">
                                    <option value="">Selecciona un grado, grupo o alumno...</option>
                                    <optgroup label="Primaria">
                                        <option value="1A">1ro A</option>
                                        <option value="1B">1ro B</option>
                                    </optgroup>
                                </select>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Asunto del Comunicado</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Ej. Suspensión de labores por consejo técnico"
                                className={`w-full border border-gray-200 px-4 py-3 rounded-xl bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all font-medium ${type === 'general' ? 'focus:ring-blue-500/20 focus:border-blue-500' : 'focus:ring-purple-500/20 focus:border-purple-500'} text-gray-900`}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Mensaje Detallado</label>
                            <textarea
                                rows={6}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Escribe el cuerpo completo del mensaje aquí..."
                                className={`w-full border border-gray-200 px-4 py-3 rounded-xl bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all resize-none ${type === 'general' ? 'focus:ring-blue-500/20 focus:border-blue-500' : 'focus:ring-purple-500/20 focus:border-purple-500'} text-gray-900`}
                                required
                            ></textarea>
                            <p className="text-xs text-gray-400 mt-2 flex justify-end">
                                {message.length} caracteres
                            </p>
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex justify-end">
                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className={`px-8 py-3.5 rounded-xl font-bold text-white transition-all flex items-center gap-2 shadow-sm ${status === 'sending' ? 'bg-gray-400 cursor-not-allowed' :
                                    type === 'general' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/25' : 'bg-purple-600 hover:bg-purple-700 shadow-purple-500/25'
                                    }`}
                            >
                                {status === 'sending' ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Procesando envío...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Publicar Comunicado</span>
                                        <Send size={18} />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}
