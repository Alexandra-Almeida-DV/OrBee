import { Home, LayoutGrid, Calendar, Settings, LogOut } from 'lucide-react';
import LogoOrbee from '../assets/Orbee.png';
import { ViewType } from '../types/View';

interface SidebarProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export function SideBar({ activeView, onViewChange }: SidebarProps) {
  return (
    <aside className="w-24 bg-[#7C7AB8] m-4 rounded-[40px] flex flex-col items-center py-8 shadow-2xl shadow-primary-700/20 h-[calc(100vh-32px)] z-50">
      
      {/* LOGO ORBEE */}
      <div className="mb-12 px-2">
        <img 
          src={LogoOrbee} 
          alt="Orbee Logo" 
          className="w-20h-auto brightness-0 invert opacity-90"
        />
      </div>

      {/* NAVEGAÇÃO */}
      <nav className="flex flex-col gap-6 flex-1">
        <SidebarButton 
          icon={<Home size={24} />} 
          active={activeView === 'Home'} 
          onClick={() => onViewChange('Home')}
        />
        <SidebarButton 
          icon={<LayoutGrid size={24} />} 
          active={activeView === 'Weekly'} 
          onClick={() => onViewChange('Weekly')}
        />
        <SidebarButton 
          icon={<Calendar size={24} />} 
          active={activeView === 'Monthly'} 
          onClick={() => onViewChange('Monthly')}
        />
        
        <div className="h-[1px] bg-white/10 my-2 mx-4" />
        
        <SidebarButton 
          icon={<Settings size={24} />} 
          active={false}
          onClick={() => {}} 
        />
      </nav>

      {/* SAIR */}
      <button className="text-white/40 hover:text-[#FF7A00] transition-colors mt-auto pb-4">
        <LogOut size={24} />
      </button>
    </aside>
  );
}

interface SidebarButtonProps {
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

function SidebarButton({ icon, active, onClick }: SidebarButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`p-4 rounded-3xl transition-all duration-300 ${
        active 
          ? 'bg-[#4C4A72] text-white shadow-lg scale-110' 
          : 'text-white/60 hover:bg-white/10 hover:text-white'
      }`}
    >
      {icon}
    </button>
  ); 
}