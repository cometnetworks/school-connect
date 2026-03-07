"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, LogIn, AlertCircle } from "lucide-react";
import Image from "next/image";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    // Redirect if already logged in
    useEffect(() => {
        if (localStorage.getItem("schoolConnectAdminAuth") === "true") {
            router.replace("/");
        }
    }, [router]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Por favor completa todos los campos.");
            return;
        }

        // Demo Admin Validation
        if (email.toLowerCase() === "admin" || email.toLowerCase() === "admin@schoolconnect.com") {
            localStorage.setItem("schoolConnectAdminAuth", "true");
            router.replace("/");
        } else {
            setError("Credenciales incorrectas. (Pista: usa admin@schoolconnect.com)");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[100px] opacity-20"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[100px] opacity-20"></div>

            <div className="relative w-full max-w-md">
                {/* Logo and Header */}
                <div className="text-center mb-10">
                    <div className="bg-white inline-flex p-4 rounded-3xl shadow-lg border border-gray-100 mb-6">
                        <img src="/logo-schoolconnect.png" alt="SchoolConnect Admin Logo" className="w-24 h-24 object-contain mx-auto" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Portal Administrativo</h1>
                    <p className="text-gray-500 mt-2 text-sm">Ingresa tus credenciales para administrar SchoolConnect</p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm flex items-start border border-red-100">
                                <AlertCircle size={18} className="mr-2 flex-shrink-0 mt-0.5" />
                                <span className="font-medium">{error}</span>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Usuario o Correo</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                    placeholder="admin@schoolconnect.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Contraseña</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-2xl transition-colors flex items-center justify-center gap-2 shadow-sm"
                        >
                            <span>Acceder al Panel</span>
                            <LogIn size={18} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
