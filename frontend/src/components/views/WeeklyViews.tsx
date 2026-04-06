import React, { useState, useEffect } from 'react';
import { format, addDays, startOfWeek } from 'date-fns'; 
import api from '../../services/api'; 

interface Task {
  id: number;
  title: string;
  description?: string;
  priority: 'high' | 'medium' | 'low';
  date: string;
}

export const WeeklyView = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  
  // Define o início da semana atual (Segunda-feira)
  const currentWeekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

  // Busca as tarefas do backend ao carregar a página
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/tasks/'); // Rota que busca todas as tasks
        setTasks(response.data);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="flex gap-6 overflow-x-auto pb-4 custom-scrollbar p-6">
      {daysOfWeek.map((day, index) => {
        // Calcula a data real de cada coluna (Segunda, Terça...)
        const columnDate = format(addDays(currentWeekStart, index), 'yyyy-MM-dd');

        // Filtra as tasks: elas precisam ter a data igual à da coluna
        const tasksForDay = tasks.filter((task) => task.date === columnDate);

        return (
          <div key={day} className="flex-1 min-w-[100px] bg-[#E2E1F3]/30 rounded-[40px] p-6">
            <div className="flex justify-between items-center mb-6 px-2">
              <div>
                <h3 className="font-bold text-[#5D5A88] text-lg">{day}</h3>
                <span className="text-[10px] text-[#8A88B6] uppercase tracking-wider">
                  {format(addDays(currentWeekStart, index), 'dd MMM')}
                </span>
              </div>
              <span className="bg-white text-[#8A88B6] px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                {tasksForDay.length}
              </span>
            </div>

            <div className="space-y-4 min-h-[500px]">
              {tasksForDay.map((task) => (
                <div key={task.id} className="bg-white p-6 rounded-[30px] shadow-sm border border-white hover:shadow-md transition-all">
                  <h4 className="font-bold text-[#5D5A88] mb-2">{task.title}</h4>
                  <p className="text-xs text-[#8A88B6] line-clamp-2">{task.description}</p>
                  <div className={`mt-4 w-2 h-2 rounded-full ${task.priority === 'high' ? 'bg-red-400' : 'bg-green-400'}`} />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};