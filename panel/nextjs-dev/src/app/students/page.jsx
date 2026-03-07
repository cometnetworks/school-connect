"use client";

import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Upload, Users, FileSpreadsheet, CheckCircle2, AlertCircle } from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

export default function StudentsPage() {
    const parents = useQuery(api.queries.getParents);
    // Let's pretend we have a getAllStudents query. For now, we'll use a mocked UI list or simple state.
    const [uploading, setUploading] = useState(false);
    const [result, setResult] = useState(null);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        setResult(null);

        // Simple mock parse delay for Demo
        setTimeout(() => {
            setUploading(false);
            setResult({
                success: true,
                message: "Se importaron 45 alumnos exitosamente desde " + file.name
            });
            // Reset input
            e.target.value = null;
        }, 2000);
    };

    return (
        <DashboardLayout title="Gestión de Alumnos">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header Actions */}
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Directorio Escolar</h2>
                        <p className="text-gray-500 text-sm mt-1">Administra los expedientes y vincula alumnos con padres.</p>
                    </div>
                </div>

                {/* Bulk Upload Section */}
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1 space-y-4">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                            <FileSpreadsheet size={24} />
                        </div>
                        <h3 className="text-lg font-bold">Carga Masiva de Alumnos</h3>
                        <p className="text-gray-500 text-sm">
                            Sube un archivo <strong className="text-gray-700">.CSV</strong> o <strong className="text-gray-700">.XLSX</strong> con las columnas:
                            <code className="mx-1 bg-gray-100 px-1 py-0.5 rounded text-secondary">Nombre</code>,
                            <code className="mx-1 bg-gray-100 px-1 py-0.5 rounded text-secondary">Grado</code>,
                            <code className="mx-1 bg-gray-100 px-1 py-0.5 rounded text-secondary">Grupo</code>,
                            <code className="mx-1 bg-gray-100 px-1 py-0.5 rounded text-secondary">EmailTutor</code>.
                        </p>
                    </div>

                    <div className="w-full md:w-auto min-w-[300px]">
                        <label className="border-2 border-dashed border-gray-200 hover:border-blue-400 bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer group">
                            <Upload className="text-gray-400 group-hover:text-blue-500 mb-2 transition-colors" size={28} />
                            <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">Seleccionar Archivo</span>
                            <span className="text-xs text-gray-400 mt-1">Max 5MB (.csv, .xlsx)</span>
                            <input
                                type="file"
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                className="hidden"
                                onChange={handleFileUpload}
                                disabled={uploading}
                            />
                        </label>
                    </div>
                </div>

                {/* Upload Status */}
                {uploading && (
                    <div className="bg-blue-50 text-blue-700 p-4 rounded-xl flex items-center gap-3 animate-pulse">
                        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <span className="font-medium text-sm">Procesando archivo e importando datos a Convex...</span>
                    </div>
                )}

                {result?.success && (
                    <div className="bg-green-50 text-green-700 p-4 rounded-xl flex items-center gap-3 animate-fade-in-up">
                        <CheckCircle2 size={20} className="text-green-600 flex-shrink-0" />
                        <span className="font-medium text-sm">{result.message}</span>
                    </div>
                )}

                {/* Students Table Placeholder */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <h3 className="font-bold text-gray-900">Alumnos Registrados (Demo)</h3>
                        <div className="relative">
                            <input type="text" placeholder="Buscar alumno..." className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                        </div>
                    </div>
                    <div className="p-12 text-center text-gray-500">
                        <Users size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="font-medium">Sube un archivo para comenzar a ver alumnos aquí.</p>
                        <p className="text-sm mt-1">La tabla se sincronizará automáticamente con Convex.</p>
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
}
