import { useState, useEffect } from 'react';
import { TopBar } from '../components/TopBar';
import { HomeView } from '../components/views/HomeView';
import { MonthlyView } from '../components/views/MonthlyView'; 
import { WeeklyView } from '../components/views/WeeklyView';
import { DailyView } from '../components/views/DailyView'; 
import { NotesView } from '../components/views/NotesView';
import { SideBar } from '../components/SideBar';
import { ProjectsView } from '../components/views/ProjectView';
import { RecipesView } from '../components/views/RecipesView';
import { ViewType } from '../types/View';
import { parseISO } from 'date-fns';

interface Task {
  id: number;
  title: string;
  date: string;
  time: string;
  category: string;
  completed: boolean;
}

export default function MainLayout() {
  const [activeView, setActiveView] = useState<ViewType>('Home');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('@OrBee:tasks');
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('@OrBee:tasks', JSON.stringify(tasks));
  }, [tasks]);

  const renderView = () => {
    switch (activeView) {
      case 'Home':
        return (
          <HomeView
            tasks={tasks}
            onViewChange={(view, date) => {
              setActiveView(view);
              if (date) setSelectedDate(date);
            }}
          />
        );

      case 'Daily':
        return (
          <DailyView
            date={selectedDate}
            tasks={tasks}
            setTasks={setTasks}
          />
        );

      case 'Weekly':
        return (
          <WeeklyView
            tasks={tasks}
            setTasks={setTasks}
          />
        );

      case 'Monthly':
        return (
          <MonthlyView
            tasks={tasks} 
            onDateClick={(dateStr: string) => {
              // Correção de fuso: parseISO interpreta a string YYYY-MM-DD literalmente
              const newDate = parseISO(dateStr);
              setSelectedDate(newDate);
              setActiveView('Daily');
            }}
          />
        );

      case 'Notas': return <NotesView />;
      case 'Project': return <ProjectsView />;
      case 'Receitas': return <RecipesView />;

      default:
        return (
          <HomeView
            tasks={tasks}
            onViewChange={setActiveView}
          />
        );
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#A5A3C8] overflow-hidden font-sans">
      <div className="h-full flex items-center">
        <SideBar activeView={activeView} onViewChange={setActiveView} />
      </div>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar activeView={activeView} onViewChange={setActiveView} />

        <main className="flex-1 overflow-y-auto p-6 pt-2">
          <div className="max-w-[1600px] mx-auto h-full">
            <div key={activeView} className="h-full">
              {renderView()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}