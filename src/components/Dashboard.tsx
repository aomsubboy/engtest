import { BookOpen, Headphones, Library, GraduationCap } from 'lucide-react';

interface DashboardProps {
  onNavigate: (view: 'reading' | 'listening' | 'flashcards') => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Active Section */}
      <div className="col-span-12 xl:col-span-8 space-y-6">
        
        {/* Welcome Header */}
        <div className="bg-slate-900 rounded-xl p-6 text-white shadow-lg flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-1">Welcome to MUELT Prep</h2>
            <p className="text-xs text-slate-400 uppercase tracking-widest">Mahidol University Preparation</p>
          </div>
          <div className="w-12 h-12 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <GraduationCap className="w-6 h-6" />
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button 
            onClick={() => onNavigate('reading')}
            className="text-left bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded bg-green-50 flex items-center justify-center text-green-600 font-bold group-hover:bg-green-600 group-hover:text-white transition-colors">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Reading Proficiency</h4>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">Grammar & Vocab</p>
              </div>
            </div>
            <div className="w-full mt-2 py-2 border border-slate-200 text-slate-700 rounded text-[11px] font-bold group-hover:bg-green-50 group-hover:text-green-700 group-hover:border-green-200 transition-colors text-center block">Start Reading Practice</div>
          </button>

          <button 
            onClick={() => onNavigate('listening')}
            className="text-left bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded bg-amber-50 flex items-center justify-center text-amber-600 font-bold group-hover:bg-amber-500 group-hover:text-white transition-colors">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Listening Mastery</h4>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">Conversations</p>
              </div>
            </div>
            <div className="w-full mt-2 py-2 border border-slate-200 text-slate-700 rounded text-[11px] font-bold group-hover:bg-amber-50 group-hover:text-amber-700 group-hover:border-amber-200 transition-colors text-center block">Start Listening Practice</div>
          </button>
        </div>

        {/* Flashcards Access */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm group hover:border-blue-300 transition-all cursor-pointer" onClick={() => onNavigate('flashcards')}>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-3">
               <div className="w-8 h-8 rounded bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                 <Library className="w-4 h-4" />
               </div>
               <h3 className="font-bold text-slate-800">Vocabulary Flashcards</h3>
            </div>
            <span className="text-blue-600 text-xs font-bold">Review Cards →</span>
          </div>
          <div className="text-sm text-slate-500 max-w-sm">Create and review your own vocabulary cards to improve your word recognition and language retention before the exam.</div>
        </div>
      </div>

      {/* Statistics Sidebar (Static as requested but styled) */}
      <div className="col-span-12 xl:col-span-4 space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 mb-4">Daily Goal</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 rounded border-2 border-blue-500 flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-blue-500 rounded-sm"></div>
              </div>
              <span className="text-xs text-slate-700 font-medium">Practice 20 Vocab Cards</span>
            </div>
            <div className="flex items-center space-x-3 opacity-50">
              <div className="w-5 h-5 rounded border-2 border-slate-300"></div>
              <span className="text-xs text-slate-500 font-medium">Complete 1 Long Listening</span>
            </div>
            <div className="flex items-center space-x-3 opacity-50">
              <div className="w-5 h-5 rounded border-2 border-slate-300"></div>
              <span className="text-xs text-slate-500 font-medium">Grammar: Review Subjunctive</span>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-900 rounded-xl p-6 text-white shadow-lg">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Overall Readiness</h3>
          <div className="flex items-center justify-center mb-6 relative">
             <svg className="w-32 h-32 transform -rotate-90">
               <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
               <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="364" strokeDashoffset="110" className="text-blue-400" />
             </svg>
             <div className="absolute flex flex-col items-center">
               <span className="text-3xl font-black">72%</span>
               <span className="text-[10px] text-slate-400 uppercase">Score Est.</span>
             </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center border-t border-slate-800 pt-6">
            <div>
              <p className="text-lg font-bold">B2</p>
              <p className="text-[10px] text-slate-500 uppercase">CEFR Level</p>
            </div>
            <div>
              <p className="text-lg font-bold">18</p>
              <p className="text-[10px] text-slate-500 uppercase">Days Left</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
