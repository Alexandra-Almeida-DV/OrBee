import { CheckCircle2 } from 'lucide-react';

export const DailyView = () => {
  const hours = ["09:00", "10:00", "11:00"];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {hours.map((hour) => (
        <div key={hour} className="flex gap-6 items-start">
          <span className="text-slate-400 font-medium pt-4 w-12 text-sm">{hour}</span>
          
          <div className="flex-1 bg-white p-6 rounded-[2rem] shadow-sm border border-slate-50 flex items-center justify-between group hover:border-kanban-mint transition-colors cursor-grab">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-kanban-mint group-hover:text-white transition-colors">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <p className="font-bold text-slate-700">Daily Meeting</p>
                <p className="text-xs text-slate-400">Sincronização com o time de dev</p>
              </div>
            </div>
            <div className="flex -space-x-2">
               <div className="w-8 h-8 rounded-full bg-blue-200 border-2 border-white" />
               <div className="w-8 h-8 rounded-full bg-pink-200 border-2 border-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};