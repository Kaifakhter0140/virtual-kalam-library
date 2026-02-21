'use client'

import { useState, useEffect, useRef } from 'react'

const INSPIRING_BOOKS = [
  { 
    id: 1, 
    title: "Wings of Fire", 
    author: "APJ Abdul Kalam", 
    purpose: "Self-belief & National Vision", 
    lesson: "Dreams are not what you see in sleep, but what keeps you awake.", 
    category: "Autobiography", 
    pdfUrl: "wings_of_fire.pdf" 
  },
  { 
    id: 2, 
    title: "The Alchemist", 
    author: "Paulo Coelho", 
    purpose: "Finding Personal Legend", 
    lesson: "When you want something, the universe conspires to help you.", 
    category: "Fiction", 
    pdfUrl: "the_alchemist.pdf" 
  },
  { 
    id: 3, 
    title: "Atomic Habits", 
    author: "James Clear", 
    purpose: "Systemic Growth", 
    lesson: "Small 1% changes lead to massive long-term results.", 
    category: "Self-Help", 
    pdfUrl: "atomic_habits.pdf" 
  },
  { 
    id: 4, 
    title: "Man's Search for Meaning", 
    author: "Viktor Frankl", 
    purpose: "Resilience in Suffering", 
    lesson: "He who has a why to live can bear almost any how.", 
    category: "Psychology", 
    pdfUrl: "man's_search_for_meaning.pdf" 
  },
  { 
    id: 5, 
    title: "Ignited Minds", 
    author: "APJ Abdul Kalam", 
    purpose: "Youth Empowerment", 
    lesson: "The resource of the youth is the most powerful on earth.", 
    category: "Philosophy", 
    pdfUrl: "ignited_minds.pdf" 
  }
];

export default function InspirationVault() {
  const [selectedBook, setSelectedBook] = useState<any | null>(null);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const [userQuery, setUserQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const responseEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (selectedBook) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [selectedBook]);

  useEffect(() => {
    if (isAiOpen && responseEndRef.current) {
      responseEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [aiResponse, isLoading, isAiOpen]);

  const handleAiInquiry = async () => {
    if (!userQuery || isLoading || !selectedBook) return;
    setIsLoading(true);
    setAiResponse("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://kaifakhter0140-kalam-ai-brain.hf.space';
      
      const response = await fetch(`${apiUrl}/ask_ai`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userQuery,
          book_path: selectedBook.pdfUrl
        }),
      });
      
      if (!response.ok) throw new Error("Backend connection failed");
      
      const data = await response.json();
      setAiResponse(data.answer);
      setUserQuery("");
    } catch (error) {
      setAiResponse("SYSTEM_ERROR: Unable to reach the AI Neural Link. Ensure Hugging Face Space is 'Running'.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#020202] text-white p-8 md:p-24 font-sans overflow-x-hidden">
      
      {/* BACKGROUND DECORATION */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0 grayscale">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
         <img src="https://upload.wikimedia.org/wikipedia/commons/b/bd/A._P._J._Abdul_Kalam.jpg" className="absolute right-0 bottom-0 h-full brightness-[0.2]" alt="Kalam" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-32">
        <header className="flex flex-col md:flex-row justify-between items-end gap-10 border-b border-white/5 pb-20">
          <div className="space-y-4">
            <h2 className="text-xl font-black tracking-[0.4em] text-white/30 italic uppercase">KalamHub_Virtual // Vault</h2>
            <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-none">Inspiration.</h1>
          </div>
          <button onClick={() => window.location.href='/'} className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500 hover:text-white transition-all italic underline underline-offset-8 decoration-yellow-500/20">Exit_Vault</button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-40">
          {INSPIRING_BOOKS.map((book) => (
            <button key={book.id} onClick={() => setSelectedBook(book)} className="p-10 rounded-[3.5rem] border bg-white/[0.02] border-white/5 hover:border-yellow-500/40 hover:scale-[1.02] transition-all duration-700 text-left h-80 flex flex-col justify-between group">
              <div className="space-y-4">
                <span className="text-[8px] font-black uppercase tracking-widest text-yellow-600">{book.category}</span>
                <h4 className="text-2xl font-black italic uppercase group-hover:text-yellow-500 transition-colors">{book.title}</h4>
                <p className="text-[10px] font-bold uppercase opacity-40">{book.author}</p>
              </div>
              <div className="pt-6 border-t border-white/5 text-[7px] font-black uppercase text-zinc-600 group-hover:text-white">Start_Reading_Process →</div>
            </button>
          ))}
        </div>
      </div>

      {selectedBook && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-10">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={() => {setSelectedBook(null); setAiResponse("");}} />
          <div className="relative w-full h-full max-w-7xl bg-[#080808] border border-white/10 rounded-none md:rounded-[4rem] overflow-hidden flex flex-col">
            
            <div className="flex justify-between items-center p-8 md:p-12 border-b border-white/5 shrink-0">
              <div className="space-y-1">
                <h3 className="text-3xl font-black italic uppercase text-white">{selectedBook.title}</h3>
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">By {selectedBook.author} // Archive</p>
              </div>
              <div className="flex items-center space-x-6">
                 <button onClick={() => setIsAiOpen(!isAiOpen)} className="px-8 py-4 rounded-full bg-yellow-500 text-black font-black italic uppercase text-[10px] tracking-widest hover:bg-white transition-all shadow-[0_0_40px_rgba(234,179,8,0.3)]">
                   {isAiOpen ? 'Close_Assistant' : 'Ask_kalamHUBAI'}
                 </button>
                 <button onClick={() => {setSelectedBook(null); setIsAiOpen(false); setAiResponse("");}} className="text-zinc-600 hover:text-white font-black uppercase text-[10px] tracking-widest">[ Close ]</button>
              </div>
            </div>

            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              <div className={`transition-all duration-700 h-full ${isAiOpen ? 'w-full md:w-2/3 border-r border-white/5' : 'w-full'}`}>
                <div className="w-full h-full bg-zinc-900 flex items-center justify-center relative">
                   {/* Ensure your PDFs are in your public/ folder locally for this to work */}
                   <object data={`/books/${selectedBook.pdfUrl}#toolbar=0`} type="application/pdf" className="w-full h-full">
                     <p className="text-white uppercase font-black italic text-center px-10">PDF Sync in Progress... <br/> Ensure books are in your public/books folder.</p>
                   </object>
                </div>
              </div>

              {isAiOpen && (
                <div className="w-full md:w-1/3 h-full bg-white text-black p-4 md:p-6 flex flex-col">
                  
                  <div className="flex items-center justify-between shrink-0 pb-3 border-b border-black/5">
                    <h4 className="text-xl font-black italic uppercase tracking-tighter">kalamHUBAI</h4>
                    <span className="text-[7px] font-black uppercase tracking-widest bg-yellow-500 text-black px-2 py-1 rounded-full">Interface_v1.0</span>
                  </div>

                  <div className="flex-1 overflow-y-auto py-3 pr-1 custom-scrollbar">
                    <div className="p-5 bg-zinc-100 rounded-[1.5rem] min-h-full flex flex-col border border-black/5">
                       <p className="text-[9px] font-black text-yellow-600 uppercase tracking-widest italic mb-2 shrink-0">//_Response</p>
                       
                       {isLoading ? (
                         <div className="flex-1 flex flex-col items-center justify-center space-y-3">
                            <div className="w-6 h-6 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin" />
                            <p className="text-[8px] font-black uppercase animate-pulse">Scanning Archive...</p>
                         </div>
                       ) : (
                         <p className="text-xs font-bold uppercase italic leading-relaxed text-zinc-800 whitespace-pre-wrap flex-1">
                           {aiResponse || "What would you like to ask about this book?"}
                         </p>
                       )}
                       
                       <div ref={responseEndRef} className="mt-2" />
                    </div>
                  </div>

                  <div className="shrink-0 pt-3 border-t border-black/5 mt-auto">
                     <input 
                      type="text" 
                      value={userQuery}
                      onChange={(e) => setUserQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAiInquiry()}
                      placeholder={isLoading ? "NEURAL_LINK_ACTIVE..." : "TYPE_MESSAGE_HERE..."} 
                      disabled={isLoading}
                      className="w-full bg-zinc-100 px-4 py-2.5 rounded-full border-none outline-none font-bold uppercase text-[10px] focus:ring-2 ring-yellow-500 transition-all italic shadow-inner"
                     />
                     <p className="text-[6px] font-black text-zinc-400 mt-1.5 text-center uppercase tracking-widest">
                       RAG: HUGGINGFACE + CHROMADB + GEMINI-1.5
                     </p>
                  </div>

                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}