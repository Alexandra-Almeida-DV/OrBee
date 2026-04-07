import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { 
  TrendingUp, 
  CheckCircle2, 
  Target, 
  BrainCircuit, 
  BarChart3, 
  Calendar as CalendarIcon 
} from 'lucide-react';

// --- TYPES ---
type Task = {
  title: string;
  completed: boolean;
};

type DayData = {
  count: number;
  completed: number;
  status: "vazio" | "concluido" | "parcial" | "pendente";
  tasks: Task[];
};

type Goal = {
  title: string;
  progress: number;
  color: string;
};

type DashboardData = {
  summary: {
    total: number;
    completed: number;
    rate: number;
    best_day: string;
    insight_message: string;
  };
  goals: Goal[];
  calendar_heatmap: Record<string, DayData>;
};

interface MonthlyViewProps {
  tasks: Task[]; 
  onDateClick: (dateStr: string) => void;
}

export function MonthlyView({ tasks, onDateClick }: MonthlyViewProps) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [selectedDay, setSelectedDay] = useState<DayData | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://localhost:8000/analytics/month")
        setData(res.data);
      } catch (err) {
        console.error("Erro ao buscar dados do backend:", err);
      }
    }
    fetchData();
  }, [tasks]); 

 function getColor(status: string) {
  switch (status) {
    case "concluido": 
      return "bg-[#cff178] text-[#3A385F]"; 
    case "parcial": 
      return "bg-[#cff178]/30 text-white"; 
    case "pendente": 
      return "bg-[#FFB5CF]/30 text-white"; 
    default: 
      return "bg-white/5 text-white/50"; 
  }
}

  const calendarDays = useMemo(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = new Date(year, month, i);
      const dateStr = dayDate.toLocaleDateString('sv-SE'); 
      const dayData = data?.calendar_heatmap[dateStr];

      days.push(
        <button
          key={dateStr}
          onClick={() => {
            onDateClick(dateStr);
            if (dayData) setSelectedDay(dayData);
          }}
          className={`h-20 rounded-[25px] transition-all duration-300 flex flex-col items-center justify-center gap-1 border-2 border-transparent hover:border-white/20 active:scale-95
            ${getColor(dayData?.status || "vazio")}`}
        >
          <span className="text-lg font-black">{i}</span>
          {dayData && dayData.count > 0 && (
             <div className="w-1 h-1 rounded-full bg-current opacity-60" />
          )}
        </button>
      );
    }
    return days;
  }, [data, onDateClick]);

  if (!data) return (
    <div className="h-full flex items-center justify-center">
      <p className="text-[#cff178] font-black animate-pulse">Carregando OrBee...</p>
    </div>
  );

  return (
    <div className="p-8 space-y-10 animate-in fade-in duration-700">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Taxa de Foco" icon={<TrendingUp size={18}/>} color="text-[#cff178]">
          {data.summary.rate}%
        </StatCard>
        <StatCard title="Total Tasks" icon={<BarChart3 size={18}/>} color="text-white">
          {data.summary.completed}/{data.summary.total}
        </StatCard>
        <StatCard title="Melhor Dia" icon={<CheckCircle2 size={18}/>} color="text-[#A5A3C8]">
          {data.summary.best_day}
        </StatCard>
        <div className="bg-[#cff178] p-5 rounded-[30px] flex items-center gap-3 shadow-lg shadow-[#cff178]/5">
           <BrainCircuit className="text-[#5D5A88]" />
           <p className="text-[#5D5A88] text-[10px] font-bold leading-tight uppercase">
             {data.summary.insight_message}
           </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* CALENDÁRIO */}
        <div className="lg:col-span-2 bg-white/5 p-8 rounded-[45px] border border-white/5">
          <h2 className="text-white font-black text-2xl mb-6 flex items-center gap-3">
            <CalendarIcon className="text-[#cff178]" /> Visão Mensal
          </h2>
          <div className="grid grid-cols-7 gap-3">
            {['S','T','Q','Q','S','S','D'].map((d, index) => (
          <div 
          key={`day-header-${index}`} 
          className="text-center text-[10px] font-black text-white/20 uppercase mb-2"
          >
            {d}
            </div>
          ))}
          {calendarDays}
          </div>
        </div>

        {/* METAS */}
        <div className="bg-white/5 p-8 rounded-[45px] border border-white/5">
          <h2 className="text-white font-black text-2xl mb-8 flex items-center gap-3">
            <Target className="text-[#FFB5CF]" /> Metas
          </h2>
          <div className="space-y-6">
            {data.goals.map((goal, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-xs font-black text-white/60">
                  <span>{goal.title}</span>
                  <span>{goal.progress}%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2 border border-white/5">
                  <div
                    className="h-full rounded-full shadow-[0_0_10px_rgba(207,241,120,0.2)] transition-all duration-1000"
                    style={{ width: `${goal.progress}%`, backgroundColor: goal.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL TAREFAS */}
      {selectedDay && (
        <div className="fixed inset-0 bg-[#5D5A88]/80 backdrop-blur-md flex items-center justify-center z-[110] p-4">
          <div className="bg-white w-full max-w-sm p-8 rounded-[40px] shadow-2xl animate-in zoom-in-95">
            <h3 className="text-[#5D5A88] font-black text-xl mb-4">Tasks do Dia</h3>
            <ul className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {selectedDay.tasks.map((task, i) => (
                <li key={i} className={`flex items-center gap-3 text-sm font-bold ${task.completed ? "text-gray-300 line-through" : "text-[#5D5A88]"}`}>
                  <div className={`w-2 h-2 rounded-full ${task.completed ? "bg-gray-200" : "bg-[#cff178]"}`} />
                  {task.title}
                </li>
              ))}
            </ul>
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedDay(null); }}
              className="mt-8 w-full bg-[#5D5A88] text-white rounded-2xl py-4 font-black text-sm transition-transform active:scale-95"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, icon, children, color }: { title: string, icon: React.ReactNode, children: React.ReactNode, color: string }) {
  return (
    <div className="bg-white/5 border border-white/5 p-5 rounded-[30px] flex flex-col gap-1">
      <div className="flex justify-between items-center text-white/30">
        <span className="text-[9px] font-black uppercase tracking-widest">{title}</span>
        {icon}
      </div>
      <p className={`text-2xl font-black ${color}`}>{children}</p>
    </div>
  );
}