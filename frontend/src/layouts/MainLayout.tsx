import { useState } from 'react';
import { SideBar } from '../components/SideBar';
import { TopBar } from '../components/TopBar';
import { HomeView } from '../components/views/HomeView';
import { MonthlyView } from '../components/views/MonthlyView';
import { WeeklyView } from '../components/views/WeekslyViews'; 
import { DailyView } from '../components/views/DailyViews';
import { ViewType } from '../types/View';

export default function MainLayout() {
  const [activeView, setActiveView] = useState<ViewType>('Home');

  const renderView = () => {
    switch (activeView) {
      case 'Home': return <HomeView />;
      case 'Monthly': return <MonthlyView />;
      case 'Daily': return <DailyView />;
      case 'Weekly': return <WeeklyView />;
      default: return <HomeView />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#A5A3C8] overflow-hidden font-sans">
      {/* 1. Sidebar com largura fixa e margem para efeito flutuante */}
      <div className="h-full flex items-center">
        <SideBar activeView={activeView} onViewChange={setActiveView} />
      </div>

      {/* 2. Área da Direita */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden"> 
        <TopBar activeView={activeView} onViewChange={setActiveView} />
        
        <main className="flex-1 overflow-y-auto p-6 pt-2">
          <div className="max-w-[1600px] mx-auto h-full">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
}