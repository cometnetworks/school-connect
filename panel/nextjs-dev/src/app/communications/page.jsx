import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

export default function CommunicationsPage() {
    const createComm = useMutation(api.mutations.createCommunication);
    const parents = useQuery(api.queries.getParents);
    const students = useQuery(api.queries.getStudents);

    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [type, setType] = useState('global'); // 'global', 'grade', 'group', 'individual'
    const [targetId, setTargetId] = useState('');
    const [status, setStatus] = useState(null);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!title || !message) return;
        if (type !== 'global' && !targetId) {
            alert("Por favor selecciona un destino");
            return;
        }

        setStatus('sending');

        try {
            await createComm({
                title,
                message,
                type,
                targetId: type === 'global' ? undefined : targetId
            });

            setStatus('success');
            setTitle('');
            setMessage('');
            setTargetId('');
            setTimeout(() => setStatus(null), 3000);
        } catch (error) {
            setStatus('error');
            console.error(error);
        }
    };

    // Helper to get unique grades/groups
    const uniqueGrades = Array.from(new Set(students?.map(s => s.grade) || []));
    const uniqueGroups = Array.from(new Set(students?.map(s => `${s.grade} ${s.group}`) || []));

    return (
        <DashboardLayout title="Difusión de Comunicados">
            <div className="max-w-4xl mx-auto space-y-8 pb-20">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Nuevo Aviso al Instituto Alina</h2>
                        <p className="text-gray-500 text-sm mt-1">Segmenta tu comunicación según el alcance necesario.</p>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="grid grid-cols-2 md:grid-cols-4 border-b border-gray-100 italic">
                        <button
                            className={`p-4 text-xs font-bold border-r border-gray-50 transition-all ${type === 'global' ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                            onClick={() => { setType('global'); setTargetId(''); }}
                        >Global</button>
                        <button
                            className={`p-4 text-xs font-bold border-r border-gray-50 transition-all ${type === 'grade' ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                            onClick={() => { setType('grade'); setTargetId(''); }}
                        >Por Grado</button>
                        <button
                            className={`p-4 text-xs font-bold border-r border-gray-50 transition-all ${type === 'group' ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                            onClick={() => { setType('group'); setTargetId(''); }}
                        >Por Grupo</button>
                        <button
                            className={`p-4 text-xs font-bold transition-all ${type === 'individual' ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                            onClick={() => { setType('individual'); setTargetId(''); }}
                        >Por Padre</button>
                    </div>

                    <form onSubmit={handleSend} className="p-8 space-y-6">
                        {status === 'success' && (
                            <div className="bg-green-50 text-green-700 p-4 rounded-xl flex items-center gap-3 animate-fade-in-up">
                                <CheckCircle2 size={20} className="text-green-600 flex-shrink-0" />
                                <span className="font-medium text-sm">Mensaje enviado correctamente.</span>
                            </div>
                        )}

                        {type !== 'global' && (
                            <div className="animate-fade-in-up">
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    {type === 'grade' ? 'Seleccionar Grado' : type === 'group' ? 'Seleccionar Grupo' : 'Seleccionar Padre'}
                                </label>
                                <select
                                    value={targetId}
                                    onChange={(e) => setTargetId(e.target.value)}
                                    className="w-full border border-gray-200 px-4 py-3 rounded-xl bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
                                    required
                                >
                                    <option value="">Selecciona una opción...</option>
                                    {type === 'grade' && uniqueGrades.map(g => <option key={g} value={g}>{g} Grado</option>)}
                                    {type === 'group' && uniqueGroups.map(g => <option key={g} value={g}>{g}</option>)}
                                    {type === 'individual' && parents?.map(p => <option key={p._id} value={p._id}>{p.name} ({p.email})</option>)}
                                </select>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Asunto</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Título del aviso..."
                                className="w-full border border-gray-200 px-4 py-3 rounded-xl bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Mensaje</label>
                            <textarea
                                rows={5}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Escribe el mensaje aquí..."
                                className="w-full border border-gray-200 px-4 py-3 rounded-xl bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                                required
                            ></textarea>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className="px-10 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center gap-2 transform active:scale-95 transition-all shadow-lg shadow-blue-500/25 disabled:bg-gray-400"
                            >
                                <span>Enviar Aviso</span>
                                <Send size={18} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}
