import { 
  Plus, 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Zap,
  MoreHorizontal
} from 'lucide-react';
import { Calendar } from '../Calendar'

export function HomeView() {
  return (
    <div className="grid grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* --- COLUNA ESQUERDA (CALENDÁRIO PRINCIPAL) --- */}
      <div className="col-span-12 lg:col-span-8 space-y-8">
        
        {/* CARD DO CALENDÁRIO MAIOR */}
        <div className="bg-white rounded-[40px] p-8 shadow-orbee border border-white/20 min-h-[600px] flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary-300/30 rounded-2xl text-primary-700">
                <CalendarIcon size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-primary-700 tracking-tight">
                  
                </h2>
              </div>
            </div>
            
            <button className="flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-2xl text-sm font-black transition-all shadow-lg shadow-accent-500/30 active:scale-95">
              <Plus size={20} /> Novo Evento
            </button>
          </div>
          
          {/* AREA ONDE ENTRARÁ O COMPONENTE DE CALENDÁRIO */}
          <div className="flex-1 w-full bg-gray-100/50 rounded-[32px] border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 group cursor-pointer hover:bg-gray-100 transition-colors">
            <div className="text-center">
              <Calendar />
            </div>
          </div>
        </div>
      </div>

      {/* --- COLUNA DIREITA (WIDGETS & PRODUTIVIDADE) --- */}
      <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
        
        {/* 1. WIDGET: FOCO DA SEMANA (Primary Dark) */}
        <div className="bg-primary-700 rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                <TrendingUp size={20} className="text-accent-500" />
              </div>
              <button className="text-white/30 hover:text-white transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>
            <p className="text-white/50 text-xs font-bold uppercase tracking-[0.2em] mb-2">Total focado hoje</p>
            <h4 className="text-4xl font-black mb-1">3457 <span className="text-lg font-medium opacity-50">horas</span></h4>
            <div className="flex items-center gap-2 mt-4">
              <span className="bg-accent-500 text-[10px] px-2 py-0.5 rounded-full font-black text-white">+12%</span>
              <p className="text-white/40 text-[10px] font-bold">em relação a ontem</p>
            </div>
          </div>
          {/* Decoração de fundo - A "Abelha" ou Logo Orbee sutil */}
          <Zap className="absolute -right-6 -bottom-6 text-white/5 w-40 h-40 -rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
        </div>

        {/* 2. WIDGET: TAREFAS DE HOJE (White Card) */}
        <div className="bg-white rounded-[40px] p-8 shadow-orbee border border-white/20 flex-1">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <CheckCircle2 size={22} className="text-accent-500" />
              <h3 className="font-black text-primary-700 tracking-tight">Hoje</h3>
            </div>
            <span className="text-[10px] font-black bg-gray-100 px-3 py-1 rounded-full text-gray-500 uppercase tracking-tighter">03 Tarefas</span>
          </div>
          
          <div className="space-y-4">
            <TaskItem title="Revisão Backend FastAPI" time="09:00" checked />
            <TaskItem title="Reunião Design Orbee" time="14:30" />
            <TaskItem title="Finalizar Sidebar" time="17:00" />
            <TaskItem title="Sync com o time" time="18:30" />
          </div>

          <button className="w-full mt-8 py-4 border-2 border-dashed border-primary-300 rounded-3xl text-primary-500 text-xs font-black uppercase tracking-widest hover:bg-primary-300/10 hover:border-primary-500 transition-all">
            + Adicionar Tarefa
          </button>
        </div>

      </div>
    </div>
  );
}

// --- SUB-COMPONENTE PARA ITENS DE TAREFA ---
function TaskItem({ title, time, checked = false }: { title: string, time: string, checked?: boolean }) {
  return (
    <div className={`flex items-center justify-between p-5 rounded-[24px] border transition-all duration-300 cursor-pointer group ${
      checked 
        ? 'bg-gray-50/50 border-transparent opacity-50' 
        : 'bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-primary-300'
    }`}>
      <div className="flex items-center gap-4">
        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
          checked 
            ? 'bg-primary-500 border-primary-500' 
            : 'border-gray-200 bg-white group-hover:border-accent-500'
        }`}>
          {checked && <CheckCircle2 size={14} className="text-white" />}
        </div>
        <div className="flex flex-col">
          <span className={`text-sm font-bold ${checked ? 'line-through text-gray-400 font-medium' : 'text-primary-700'}`}>
            {title}
          </span>
          <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
            <Clock size={10} />
            <span>{time}</span>
          </div>
        </div>
      </div>
    </div>
  );
}