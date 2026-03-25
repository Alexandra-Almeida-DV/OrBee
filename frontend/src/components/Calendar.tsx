import { useState } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay,
  eachDayOfInterval 
} from 'date-fns';
import { ptBR } from 'date-fns/locale'; // Para meses em Português
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Funções de Navegação
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  // Lógica para gerar os dias
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <div className="w-full h-full flex flex-col animate-in fade-in duration-700">
      
      {/* HEADER DINÂMICO */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex flex-col">
          <h3 className="text-2xl font-black text-primary-700 capitalize">
            {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
          </h3>
          <p className="text-[10px] font-bold text-accent-500 uppercase tracking-widest">
            {calendarDays.length / 7} Semanas no período
          </p>
        </div>

        <div className="flex gap-3 bg-white shadow-sm border border-gray-100 p-1.5 rounded-2xl">
          <button onClick={prevMonth} className="p-2 hover:bg-primary-300/20 rounded-xl transition-all text-primary-700">
            <ChevronLeft size={20} />
          </button>
          <button onClick={() => setCurrentDate(new Date())} className="px-3 text-[10px] font-black uppercase hover:text-accent-500">
            Hoje
          </button>
          <button onClick={nextMonth} className="p-2 hover:bg-primary-300/20 rounded-xl transition-all text-primary-700">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* CABEÇALHO DOS DIAS */}
      <div className="grid grid-cols-7 mb-4 border-b border-gray-100 pb-4">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            {day}
          </div>
        ))}
      </div>

      {/* GRADE DE DIAS REAL */}
      <div className="grid grid-cols-7 gap-3 flex-1">
        {calendarDays.map((day, index) => {
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isToday = isSameDay(day, new Date());

          return (
            <div 
              key={index} 
              className={`group relative flex flex-col items-center justify-center rounded-[24px] transition-all cursor-pointer min-h-[60px] border-2
                ${!isCurrentMonth ? 'opacity-20 grayscale' : ''}
                ${isToday 
                  ? 'bg-primary-700 border-primary-700 text-white shadow-lg shadow-primary-700/30 scale-105 z-10' 
                  : 'bg-white border-transparent hover:border-primary-300 text-primary-700'
                }`}
            >
              <span className={`text-sm ${isToday ? 'font-black' : 'font-bold'}`}>
                {format(day, 'd')}
              </span>

              {/* Indicador de tarefa (Dot) - Aqui depois viria a lógica do seu Backend */}
              {isCurrentMonth && !isToday && index % 7 === 0 && (
                <div className="absolute bottom-3 w-1.5 h-1.5 bg-accent-500 rounded-full animate-pulse" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}