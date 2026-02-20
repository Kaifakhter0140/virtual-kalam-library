'use client'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020202] text-white flex flex-col font-sans selection:bg-yellow-500 overflow-x-hidden">
      
      {/* 🎞️ ATMOSPHERIC ENVIRONMENT */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] z-10" />
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/b/bd/A._P._J._Abdul_Kalam.jpg" 
          className="absolute right-[-10%] bottom-0 h-[90vh] md:h-full grayscale brightness-[0.15] opacity-40 z-0" 
          alt="Dr. APJ Abdul Kalam"
        />
      </div>

      <nav className="relative z-20 flex justify-between items-center px-8 py-10 md:px-24">
        <div className="flex items-center space-x-2">
          <div className="w-1 h-8 bg-yellow-500" />
          <h2 className="text-2xl font-black italic tracking-tighter uppercase">
            Kalam<span className="text-yellow-500">Hub</span> Virtual
          </h2>
        </div>
        <div className="hidden md:flex space-x-12 opacity-40 text-[10px] font-black uppercase tracking-[0.3em] italic">
          <span>//_Archives</span>
          <span>//_Intelligence</span>
          <span>//_2026</span>
        </div>
      </nav>

      <section className="relative z-10 flex-1 flex flex-col justify-center px-8 md:px-24 py-20 space-y-12">
        <div className="space-y-4">
          <p className="text-yellow-500 text-[10px] font-black tracking-[0.8em] uppercase italic opacity-60">
            //_Accessing_Digital_Archives_
          </p>
          <div className="space-y-[-1vw]">
            <h1 className="text-[15vw] md:text-[10vw] font-black italic tracking-tighter leading-none uppercase text-white">Dream.</h1>
            <h1 className="text-[15vw] md:text-[10vw] font-black italic tracking-tighter leading-none uppercase outline-text">Learn.</h1>
            <h1 className="text-[15vw] md:text-[10vw] font-black italic tracking-tighter leading-none uppercase text-white">Achieve.</h1>
          </div>
        </div>

        <p className="max-w-xl text-zinc-500 text-lg md:text-xl font-medium leading-relaxed italic">
          A specialized repository of high-quality educational resources, curated for the next generation of igniting minds.
        </p>

        <div className="flex flex-col md:flex-row gap-6 pt-10">
          <button 
            onClick={() => window.location.href='/knowledge-architect'}
            className="group relative px-12 py-8 rounded-full bg-white text-black font-black italic uppercase tracking-[0.3em] hover:bg-yellow-500 transition-all duration-700 shadow-2xl overflow-hidden"
          >
            <span className="relative z-10">Open_Knowledge_Architect</span>
            <div className="absolute top-0 left-0 w-full h-full bg-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 z-0" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full animate-ping z-20" />
          </button>

          <button 
            onClick={() => window.location.href='/inspiration-vault'}
            className="group relative px-12 py-8 rounded-full border border-white/20 text-white font-black italic uppercase tracking-[0.3em] hover:border-yellow-500 hover:text-yellow-500 transition-all duration-700 overflow-hidden"
          >
            <span className="relative z-10">Access_Inspiration_Vault</span>
            <div className="absolute top-0 left-0 w-full h-full bg-white/5 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-500 z-0" />
          </button>
        </div>
      </section>

      <footer className="relative z-10 px-8 md:px-24 py-20 flex justify-between items-end border-t border-white/5">
        <div className="space-y-2">
          <p className="text-[8px] font-black uppercase tracking-[0.5em] text-zinc-600">Project_Status</p>
          <div className="flex items-center space-x-3">
             <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
             <span className="text-[10px] font-black uppercase italic">Neural_Active_Link_Established</span>
          </div>
        </div>
        <div className="text-[30px] font-black italic opacity-10">N</div>
      </footer>
    </main>
  )
}