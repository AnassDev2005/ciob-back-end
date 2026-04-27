import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchMessages,
    markMessageRead,
    deleteMessage,
} from '../../store/slices/adminSlice';
import {
    MessageSquare, Search, Trash2, CheckCircle2, Circle, X, Mail,
} from 'lucide-react';

const MessageManagement = () => {
    const dispatch = useDispatch();
    const { messages, loading } = useSelector((state) => state.admin);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [filterUnread, setFilterUnread] = useState(false);

    useEffect(() => {
        dispatch(fetchMessages());
    }, [dispatch]);

    const filtered = messages.filter((m) => {
        const matchSearch =
            m.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.subject?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchSearch && (!filterUnread || !m.is_read);
    });

    const handleToggleRead = (msg) => {
        dispatch(markMessageRead({ id: msg.id, is_read: !msg.is_read }));
        if (selectedMessage?.id === msg.id) {
            setSelectedMessage({ ...selectedMessage, is_read: !msg.is_read });
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('Supprimer ce message ?')) {
            dispatch(deleteMessage(id));
            if (selectedMessage?.id === id) setSelectedMessage(null);
        }
    };

    const openDetail = (msg) => {
        setSelectedMessage(msg);
        if (!msg.is_read) {
            dispatch(markMessageRead({ id: msg.id, is_read: true }));
        }
    };

    const unreadCount = messages.filter((m) => !m.is_read).length;

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900">Gestion des Messages</h1>
                    <p className="text-gray-500 mt-1 font-medium">
                        {messages.length} message(s) —{' '}
                        <span className="text-amber-600 font-black">{unreadCount} non lu(s)</span>
                    </p>
                </div>
                <button
                    onClick={() => setFilterUnread(!filterUnread)}
                    className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all border ${filterUnread
                            ? 'bg-amber-500 text-white border-amber-500 shadow-lg shadow-amber-200'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-amber-400'
                        }`}
                >
                    {filterUnread ? '✓ Non lus seulement' : 'Tous les messages'}
                </button>
            </header>

            <div className="flex gap-6 h-[calc(100vh-260px)] min-h-[400px]">
                {/* Message list */}
                <div className="w-full lg:w-1/2 xl:w-2/5 bg-white rounded-[2rem] border border-gray-100 shadow-sm flex flex-col">
                    <div className="p-4 border-b border-gray-50">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                className="w-full bg-gray-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-amber-400 transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-3 top-3 text-gray-400" size={16} />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
                        {loading && messages.length === 0 ? (
                            <div className="p-8 text-center text-gray-300 animate-pulse">Chargement...</div>
                        ) : filtered.length === 0 ? (
                            <div className="p-8 text-center">
                                <Mail size={32} className="text-gray-200 mx-auto mb-2" />
                                <p className="text-gray-400 text-sm font-medium">Aucun message trouvé.</p>
                            </div>
                        ) : (
                            filtered.map((msg) => (
                                <div
                                    key={msg.id}
                                    onClick={() => openDetail(msg)}
                                    className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 relative ${selectedMessage?.id === msg.id ? 'bg-amber-50 border-r-4 border-amber-400' : ''
                                        }`}
                                >
                                    {!msg.is_read && (
                                        <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-amber-400" />
                                    )}
                                    <div className="flex items-start gap-3">
                                        <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-black text-sm ${msg.is_read
                                                ? 'bg-gray-100 text-gray-500'
                                                : 'bg-amber-100 text-amber-700'
                                            }`}>
                                            {msg.name?.charAt(0)?.toUpperCase() || '?'}
                                        </div>
                                        <div className="flex-1 min-w-0 pr-4">
                                            <p className={`text-sm truncate ${msg.is_read ? 'font-medium text-gray-700' : 'font-black text-gray-900'}`}>
                                                {msg.name}
                                            </p>
                                            <p className={`text-xs truncate ${msg.is_read ? 'text-gray-400' : 'text-gray-600 font-bold'}`}>
                                                {msg.subject || '(Sans sujet)'}
                                            </p>
                                            <p className="text-[10px] text-gray-400 mt-0.5">
                                                {new Date(msg.created_at).toLocaleDateString('fr-FR', {
                                                    day: '2-digit', month: 'short', year: 'numeric',
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Detail panel */}
                <div className="hidden lg:flex flex-1 bg-white rounded-[2rem] border border-gray-100 shadow-sm flex-col">
                    {selectedMessage ? (
                        <>
                            <div className="p-6 border-b border-gray-50 flex items-start justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-black text-lg">
                                        {selectedMessage.name?.charAt(0)?.toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-black text-gray-900">{selectedMessage.name}</p>
                                        <p className="text-sm text-gray-500">{selectedMessage.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <button
                                        onClick={() => handleToggleRead(selectedMessage)}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${selectedMessage.is_read
                                                ? 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                                : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                                            }`}
                                        title={selectedMessage.is_read ? 'Marquer comme non lu' : 'Marquer comme lu'}
                                    >
                                        {selectedMessage.is_read ? <Circle size={14} /> : <CheckCircle2 size={14} />}
                                        {selectedMessage.is_read ? 'Non lu' : 'Lu'}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(selectedMessage.id)}
                                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => setSelectedMessage(null)}
                                        className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-xl transition-all"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-6 flex-1 overflow-y-auto">
                                <h2 className="text-xl font-black text-gray-900 mb-1">
                                    {selectedMessage.subject || '(Sans sujet)'}
                                </h2>
                                <p className="text-xs text-gray-400 mb-6">
                                    {new Date(selectedMessage.created_at).toLocaleDateString('fr-FR', {
                                        weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
                                    })}
                                </p>
                                <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
                                    {selectedMessage.message}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-200">
                                <MessageSquare size={36} />
                            </div>
                            <p className="text-gray-400 font-medium">Sélectionnez un message pour le lire.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessageManagement;
