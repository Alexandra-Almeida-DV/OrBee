import React, { useState } from 'react';
import { Settings, User, ShieldCheck, Target, DatabaseZap, Save, ArrowRight } from 'lucide-react';

export function SettingsView() {
  const [activeTab, setActiveTab] = useState('Perfil');

  const navItems = [
    { name: 'Perfil', icon: User },
    { name: 'Segurança', icon: ShieldCheck },
    { name: 'Foco & Objetivos', icon: Target },
    { name: 'API & Conexões', icon: DatabaseZap },
  ];

  return (
    <div className="p-4 md:p-8 lg:p-12 min-h-screen bg-[#3A385F]/5 font-sans relative overflow-hidden animate-in fade-in duration-700">
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#CFF178]/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#3A385F]/10 rounded-full blur-[150px]" />
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        <header className="flex items-center gap-6 p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-[30px] shadow-2xl">
          <div className="bg-[#CFF178] p-5 rounded-[20px] shadow-xl hover:scale-105 transition-transform duration-300">
            <Settings size={44} className="text-[#3A385F]" />
          </div>
          <div className="flex-1">
            <p className="text-[#CFF178] text-xs font-black uppercase tracking-[0.3em] mb-1">Central de Controle</p>
            <h2 className="text-white text-4xl lg:text-5xl font-black tracking-tighter leading-none">Configurações OrBee</h2>
          </div>
          <div className="bg-[#3A385F] text-[#CFF178] p-3 rounded-xl text-[9px] font-black uppercase tracking-[0.1em] text-center shrink-0">
            System v2.0
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* MENU LATERAL DE NAVEGAÇÃO INTERNA (GLASSMORPHISM) */}
          <nav className="lg:col-span-3 space-y-4 p-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-[40px] shadow-xl h-fit sticky top-10">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;
              return (
                <button 
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={`w-full text-left px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-3 group
                             ${isActive 
                               ? 'bg-[#CFF178] text-[#3A385F] shadow-xl scale-[1.03]' 
                               : 'text-white/70 hover:bg-white/10 hover:text-white hover:scale-[1.01]'}`}
                >
                  <Icon size={18} className={`${isActive ? 'text-[#3A385F]' : 'text-[#CFF178]/60 group-hover:text-[#CFF178]'} transition-colors`} />
                  {item.name}
                </button>
              );
            })}
          </nav>

          {/* ÁREA DE CONTEÚDO (GLASSMORPHISM PRINCIPAL COM BORDA LUMINOSA) */}
          <main className="lg:col-span-9 bg-white/10 backdrop-blur-2xl border border-white/30 p-10 lg:p-14 rounded-[50px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] space-y-12">
            
            {/* SEÇÃO: PERFIL */}
            {activeTab === 'Perfil' && (
              <section className="space-y-10 animate-in fade-in slide-in-from-right-10 duration-500">
                <div className="pb-4 border-b border-white/10">
                  <h3 className="text-white text-3xl font-black tracking-tight">Informações do Perfil</h3>
                  <p className="text-[#CFF178] text-xs font-black uppercase tracking-[0.2em] mt-1">Sua identidade na Colméia.</p>
                </div>
                
                <div className="flex flex-col md:flex-row items-center gap-8 bg-black/10 p-8 rounded-[30px] border border-white/10 shadow-inner">
                   <div className="relative">
                      <div className="w-28 h-28 rounded-full overflow-hidden bg-white/10 shadow-xl flex items-center justify-center border-4 border-[#CFF178]/40 p-1">
                        <img src="https://api.dicebear.com/8.x/notionists-neutral/svg?seed=Felix" className="w-full h-full object-cover rounded-full bg-[#B1AFCE]" alt="Avatar" />
                      </div>
                      <button className="absolute bottom-0 right-0 bg-[#CFF178] text-[#3A385F] p-2 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all">
                        <Save size={16} />
                      </button>
                   </div>
                   <div className="flex-1 space-y-2 text-center md:text-left">
                      <h4 className="text-white text-xl font-black">Felix OrBee</h4>
                      <p className="text-white/60 text-sm">felix@orbee.ai</p>
                      <span className="inline-block bg-[#3A385F]/50 text-[#CFF178] px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mt-2 border border-[#CFF178]/20">Administrador</span>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[#3A385F]/50 text-[11px] font-black uppercase tracking-widest ml-5">Nome Completo</label>
                    <input type="text" defaultValue="Felix OrBee da Silva" className="w-full bg-black/10 backdrop-blur-sm border border-white/10 rounded-2xl py-5 px-7 text-white outline-none focus:border-[#CFF178]/50 focus:bg-black/20 transition-all placeholder:text-white/30" placeholder="Seu nome..." />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[#3A385F]/50 text-[11px] font-black uppercase tracking-widest ml-5">Nome de Exibição (Como quer ser chamado?)</label>
                    <input type="text" defaultValue="Felix OrBee" className="w-full bg-black/10 backdrop-blur-sm border border-white/10 rounded-2xl py-5 px-7 text-white outline-none focus:border-[#CFF178]/50 focus:bg-black/20 transition-all placeholder:text-white/30" />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[#3A385F]/50 text-[11px] font-black uppercase tracking-widest ml-5">Bio Profissional / Objetivo</label>
                  <textarea className="w-full bg-black/10 backdrop-blur-sm border border-white/10 rounded-3xl py-5 px-7 text-white outline-none h-40 resize-none focus:border-[#CFF178]/50 focus:bg-black/20 transition-all placeholder:text-white/30" defaultValue="Focado em otimizar a inteligência agrícola e expandir a Colméia OrBee." />
                </div>
              </section>
            )}

            {activeTab !== 'Perfil' && (
              <div className="text-center py-20 text-white/50 animate-in fade-in duration-500">
                <p className="text-5xl mb-4">⚙️</p>
                <p>Conteúdo da aba <strong className="text-white">{activeTab}</strong> em desenvolvimento...</p>
              </div>
            )}

            {/* BOTÃO DE SALVAR (LUMINOSO) */}
            <div className="flex justify-end pt-10 border-t border-white/10">
              <button className="bg-[#CFF178] text-[#3A385F] font-black px-12 py-5 rounded-3xl shadow-[0_10px_20px_-5px_rgba(207,241,120,0.5)] hover:scale-105 active:scale-95 hover:shadow-[0_15px_30px_-5px_rgba(207,241,120,0.7)] transition-all flex items-center gap-3 group">
                Salvar Alterações
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}