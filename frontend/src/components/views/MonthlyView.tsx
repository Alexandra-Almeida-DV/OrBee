import { Folder, FileText } from 'lucide-react';

export const MonthlyView = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold text-slate-800">Visão Mensal</h2>
        <p className="text-slate-500">Resumo de março de 2026</p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Card de Storage/Progresso (Estilo Foto 3) */}
        <div className="col-span-4 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center">
          <h3 className="font-bold text-lg mb-6 self-start">Progresso Geral</h3>
          <div className="relative w-40 h-40 flex items-center justify-center">
             {/* Simulação do Gráfico de Pizza */}
             <div className="absolute inset-0 rounded-full border-[16px] border-slate-100"></div>
             <div className="absolute inset-0 rounded-full border-[16px] border-kanban-mint border-t-transparent border-l-transparent -rotate-45"></div>
             <span className="text-2xl font-black text-slate-700">37%</span>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 w-full text-xs font-medium">
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-kanban-mint"/> Tarefas</div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-kanban-purple"/> Projetos</div>
          </div>
        </div>

        {/* Cards de Pastas/Categorias (Estilo Foto 3) */}
        <div className="col-span-8 grid grid-cols-2 gap-6">
          <div className="bg-kanban-mint p-6 rounded-[2.5rem] text-white flex flex-col justify-between aspect-video shadow-lg shadow-kanban-mint/20">
            <Folder size={32} />
            <div>
              <p className="font-bold text-xl">Desenvolvimento</p>
              <p className="opacity-80 text-sm">8 cards ativos</p>
            </div>
          </div>
          <div className="bg-kanban-purple p-6 rounded-[2.5rem] text-white flex flex-col justify-between aspect-video shadow-lg shadow-kanban-purple/20">
            <FileText size={32} />
            <div>
              <p className="font-bold text-xl">Estudos</p>
              <p className="opacity-80 text-sm">4 cards ativos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};