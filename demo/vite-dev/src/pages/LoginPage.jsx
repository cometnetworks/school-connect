import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Fetch parents to validate email (Demo purpose only)
    const parents = useQuery(api.queries.getParents);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Por favor completa todos los campos.');
            return;
        }

        const emailLower = email.toLowerCase();
        const isMasterDemo = (emailLower === 'mario@padres.com' || emailLower === 'carlos.mendoza@email.com' || emailLower === 'carlos.mendoza@gmail.com');

        // Check in Convex data
        const parent = parents?.find(p => p.email.toLowerCase() === emailLower);

        if (parent || isMasterDemo) {
            localStorage.setItem('schoolConnectAuth', 'true');

            // Critical: Ensure WE ALWAYS HAVE AN ID for the dashboard query
            const finalId = parent?._id || "parent_demo_id";
            const finalName = parent?.name || "Carlos Mendoza";

            localStorage.setItem('schoolConnectParentId', finalId);
            localStorage.setItem('schoolConnectParentName', finalName);

            navigate('/');
        } else {
            setError('Credenciales incorrectas. (Pista: usa carlos.mendoza@email.com)');
        }
    };

    return (
        <div className="min-h-screen bg-[var(--color-brand-light)] flex flex-col justify-center items-center p-6 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-[var(--color-brand-blue)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-[var(--color-brand-purple)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-[-20%] left-[20%] w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

            <div className="relative w-full max-w-sm">
                {/* Logo and Header */}
                <div className="text-center mb-10 animate-fade-in">
                    <div className="inline-block p-4 bg-white/50 backdrop-blur-md rounded-[2.5rem] shadow-xl mb-6">
                        <img src="/logo-schoolconnect.png" alt="Instituto Alina Logo" className="w-24 h-24 object-contain" />
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Instituto Alina</h1>
                    <p className="text-gray-500 font-medium">Portal para Padres de Familia</p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-3xl shadow-xl p-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {error && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm flex items-start">
                                <AlertCircle size={18} className="mr-2 flex-shrink-0 mt-0.5" />
                                <span>{error}</span>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] focus:border-transparent transition-all"
                                    placeholder="carlos.mendoza@email.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-purple)] text-white font-medium py-3.5 px-4 rounded-2xl hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/25"
                        >
                            <span>Ingresar</span>
                            <LogIn size={18} />
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <a href="#" className="text-sm border-b border-transparent hover:border-[var(--color-brand-blue)] pb-0.5 transition-colors text-[var(--color-brand-blue)] font-medium">
                            ¿Olvidaste tu contraseña?
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
