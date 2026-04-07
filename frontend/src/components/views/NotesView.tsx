import { Plus, Trash2, X, Check, StickyNote } from 'lucide-react';
import { useState, useEffect } from 'react'; 
import api from '../../services/api';

interface Note {
  id: number;
  content: string;
  color: string;
  date?: string;      
  created_at?: string; 
}

export function NotesView() {
  const [notes, setNotes] = useState<Note[]>([]); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNoteText, setNewNoteText] = useState("");
  const formatarData = (dateStr?: string) => {
    if (!dateStr) return "Hoje";
    const data = new Date(dateStr);
    if (isNaN(data.getTime())) return "Recente";
    return data.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  };

  useEffect(() => {
    const carregarNotas = async () => {
      try {
        const response = await api.get('/notes/');
        setNotes(response.data); 
      } catch (error) {
        console.error("Erro ao carregar notas do backend:", error);
      }
    };
    carregarNotas();
  }, []);

  const handleSaveNote = async () => {
    if (newNoteText.trim() === "") return;

    try {
      const response = await api.post<Note>('/notes/', {
          title: newNoteText.slice(0, 20),
          content: newNoteText,
          color: "#cff178" 
      });

      setNotes((prev) => [response.data, ...prev]);
      setNewNoteText("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro ao salvar nota:", error);
      alert("Não foi possível salvar no banco de dados.");
    }
  };

  const deleteNote = async (id: number) => {
    try {
      await api.delete(`/notes/${id}`);
      setNotes(notes.filter(note => note.id !== id));
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  return (
    <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-700 relative min-h-screen">
      <header className="flex items-center gap-4 mb-10"> 
        <div className="bg-[#cff178] p-3 rounded-2xl shadow-lg shadow-orange-100 flex-shrink-0">
          <StickyNote className="text-white" size={28} />
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-black text-[#5D5A88] leading-none">
            Notas <span className="text-[#cff178]">Pessoais</span>
          </h2>
          <p className="text-[#8A88B6] font-bold text-[10px] uppercase tracking-widest mt-1">
            Seus insights e lembretes
          </p>
        </div>
      </header>

      <div className="flex flex-wrap gap-8">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-72 h-72 rounded-[40px] border-2 border-dashed border-white/40 bg-white/5 backdrop-blur-md flex flex-col items-center justify-center text-[#5D5A88] hover:bg-white/20 hover:border-[#cff178] transition-all group active:scale-95 shadow-sm"
        >
          <div className="p-5 bg-white/20 rounded-full group-hover:bg-[#cff178] group-hover:text-white transition-all">
            <Plus size={36} />
          </div>
          <span className="mt-4 font-black uppercase text-[11px] tracking-[0.2em] opacity-60">Nova Nota</span>
        </button>

        {notes.map((note) => (
          <div key={note.id} className="w-72 h-72 p-8 rounded-[40px] bg-white/40 backdrop-blur-xl border border-white/50 shadow-xl flex flex-col justify-between hover:scale-105 transition-all group">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-black text-[#8A88B6] uppercase tracking-widest bg-white/30 px-3 py-1 rounded-full">
                {formatarData(note.date || note.created_at)}
              </span>
              <button onClick={() => deleteNote(note.id)} className="text-[#8A88B6] hover:text-red-400 transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
            <p className="text-[#5D5A88] font-bold leading-relaxed text-lg italic overflow-y-auto pr-2">
              "{note.content}"
            </p>
            <div className="h-1 w-full bg-[#cff178]/40 rounded-full mt-4" />
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#5D5A88]/20 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white/90 backdrop-blur-2xl w-full max-w-lg p-10 rounded-[50px] shadow-2xl border border-white flex flex-col gap-6 scale-in-center">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-black text-[#5D5A88]">Escreva sua nota</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[#8A88B6] hover:rotate-90 transition-transform">
                <X size={24} />
              </button>
            </div>

            <textarea 
              autoFocus
              className="w-full h-40 p-6 rounded-[30px] bg-[#5D5A88]/5 border-none focus:ring-2 focus:ring-[#cff178] text-[#5D5A88] font-medium resize-none placeholder:text-[#8A88B6]/50"
              placeholder="O que você está pensando?"
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
            />

            <button 
              onClick={handleSaveNote}
              className="w-full py-5 bg-[#cff178] hover:bg-[#b8d962] text-white rounded-[30px] font-black flex items-center justify-center gap-2 shadow-lg shadow-[#cff178]/30 transition-all active:scale-95"
            >
              <Check size={20} /> Salvar Nota
            </button>
          </div>
        </div>
      )}
    </div>
  );
}