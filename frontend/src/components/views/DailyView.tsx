import React, { useState } from 'react';
import { 
  Clock, 
  Plus, 
  Circle, 
  CheckCircle2, 
  Trash2, 
  AlignLeft, 
  X 
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// --- INTERFACES ---
interface Task {
  id: number;
  title: string;
  date: string;
  time: string;
  category: string;
  completed: boolean;
}

interface DailyViewProps {
  date: Date;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export function DailyView({ date, tasks, setTasks }: DailyViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    date: format(date, 'yyyy-MM-dd'),
    time: '',
    category: 'Geral'
  });

  const handleSaveTask = () => {
    if (!newTask.title || !newTask.time) return;
    const taskToAdd: Task = { id: Date.now(), ...newTask, completed: false };
    setTasks(prev => [...prev, taskToAdd].sort((a, b) => a.time.localeCompare(b.time)));
    setIsModalOpen(false);
    setNewTask({ title: '', date: newTask.date, time: '', category: 'Geral' });
  };

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const selectedDateStr = format(date, 'yyyy-MM-dd');
  const filteredTasks = tasks.filter(task => task.date === selectedDateStr);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="max-w-4xl mx-auto p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* HEADER IMPACTANTE - IDENTIDADE DAILY */}
      <header className="flex items-end justify-between mb-16">
        <div className="flex items-center gap-6">
          <h2 className="text-8xl font-black text-white tracking-tighter leading-none">
            {format(date, 'dd')}
          </h2>
          <div className="flex flex-col border-l-2 border-[#cff178] pl-6 py-1">
            <span className="text-[#cff178] font-black text-2xl uppercase tracking-widest">
              {format(date, 'MMMM', { locale: ptBR })}
            </span>
            <span className="text-white/40 font-bold text-lg uppercase">
              {format(date, 'eeee', { locale: ptBR })}
            </span>
          </div>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-[#cff178] hover:bg-[#bde85d] text-[#5D5A88] px-10 py-5 rounded-[25px] font-black flex items-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-[#cff178]/10"
        >
          <Plus size={24} strokeWidth={3} /> 
          <span className="text-sm uppercase tracking-wider">Nova Task</span>
        </button>
      </header>

      <div className="relative space-y-4">
        
        <div className="absolute left-5 top-0 bottom-0 w-[2px] bg-white/5" />

        {filteredTasks.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-[#cff178] italic text-2xl font-light opacity-60">
              Nenhum compromisso para hoje... aproveite! ✨
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div key={task.id} className="relative flex items-center group">
              <button 
                onClick={() => toggleTask(task.id)}
                className={`w-10 h-10 rounded-full border-4 flex items-center justify-center z-10 transition-all duration-300
                  ${task.completed 
                    ? 'bg-[#cff178] border-[#cff178] shadow-[0_0_15px_rgba(207,241,120,0.3)]' 
                    : 'bg-[#7C7AB8] border-white/10 hover:border-[#cff178]/50'}`}
              >
                {task.completed 
                  ? <CheckCircle2 size={20} className="text-[#5D5A88]" /> 
                  : <Circle size={20} className="text-white/10 group-hover:text-white/30" />}
              </button>

              <div className={`ml-8 flex-1 p-6 rounded-[35px] flex items-center justify-between transition-all duration-300 border
                ${task.completed 
                  ? 'bg-white/5 border-transparent opacity-40 grayscale' 
                  : 'bg-white/10 border-white/5 hover:bg-white/15 hover:border-white/10 hover:translate-x-2'}`}
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-[#cff178] font-black text-[10px] uppercase tracking-widest">
                    <Clock size={12} strokeWidth={3} />
                    {task.time}
                  </div>
                  <h3 className={`text-xl font-bold text-white tracking-tight ${task.completed ? 'line-through decoration-2' : ''}`}>
                    {task.title}
                  </h3>
                </div>

                <button 
                  onClick={() => deleteTask(task.id)} 
                  className="text-white/10 hover:text-red-400 hover:bg-red-400/10 p-3 rounded-2xl transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#5D5A88]/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-xl p-10 rounded-[50px] shadow-2xl flex flex-col gap-8 animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black text-[#5D5A88]">Agendar Tarefa</h3>
                <p className="text-[#8A88B6] text-sm">O que a OrBee vai te lembrar?</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-[#8A88B6] hover:rotate-90 transition-transform">
                <X size={28} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="relative group">
                <AlignLeft className="absolute left-6 top-6 text-[#8A88B6]" size={22} />
                <textarea 
                  className="w-full h-36 pl-16 pr-8 py-6 rounded-[35px] bg-[#5D5A88]/5 border-2 border-transparent focus:border-[#cff178] focus:bg-white text-[#5D5A88] font-bold text-lg outline-none resize-none"
                  placeholder="Descreva sua missão..."
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="time" 
                  className="w-full px-8 py-5 rounded-[25px] bg-[#5D5A88]/5 border-2 border-transparent focus:border-[#cff178] text-[#5D5A88] font-bold outline-none"
                  value={newTask.time} 
                  onChange={(e) => setNewTask({...newTask, time: e.target.value})} 
                />
                <div className="flex items-center justify-center bg-[#5D5A88]/5 rounded-[25px] text-[#8A88B6] font-bold text-sm">
                  {format(date, 'dd/MM/yyyy')}
                </div>
              </div>
            </div>

            <button 
              onClick={handleSaveTask} 
              className="w-full py-6 bg-[#cff178] hover:bg-[#bde85d] text-[#5D5A88] rounded-[30px] font-black text-lg shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              <Plus size={24} /> Confirmar na OrBee
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}