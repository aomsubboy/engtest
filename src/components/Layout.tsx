import { ReactNode } from 'react';
import { BookOpen, Headphones, Library, Menu, X, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LayoutProps {
  children: ReactNode;
  title: string;
  onBack?: () => void;
  showBack?: boolean;
  currentView?: string;
  onNavigate?: (view: any) => void;
}

export default function Layout({ children, title, onBack, showBack = false, currentView, onNavigate }: LayoutProps) {
  return (
    <div className="h-screen w-full flex overflow-hidden bg-slate-50 font-sans text-slate-900">
      {/* Sidebar Navigation */}
      <nav className="w-64 bg-slate-900 text-white flex-col hidden md:flex shrink-0">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-xl font-bold tracking-tight uppercase cursor-pointer" onClick={() => onNavigate?.('dashboard')}>MUELT <span className="text-blue-400">Mastery</span></h1>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">Mahidol Preparation</p>
        </div>
        
        <div className="flex-1 py-4 overflow-y-auto">
          <div className="px-6 mb-4">
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Practice Sections</p>
            <ul className="space-y-1">
              <li onClick={() => onNavigate?.('reading')} className={`flex items-center space-x-3 p-2 rounded text-sm cursor-pointer transition-colors ${currentView === 'reading' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-300'}`}>
                <BookOpen className="w-4 h-4" />
                <span>Reading Part</span>
              </li>
              <li onClick={() => onNavigate?.('listening')} className={`flex items-center space-x-3 p-2 rounded text-sm cursor-pointer transition-colors ${currentView === 'listening' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-300'}`}>
                <Headphones className="w-4 h-4" />
                <span>Listening Part</span>
              </li>
            </ul>
          </div>

          <div className="px-6 mb-4">
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Personal Tools</p>
            <ul className="space-y-1">
              <li onClick={() => onNavigate?.('flashcards')} className={`flex items-center justify-between p-2 rounded text-sm cursor-pointer transition-colors ${currentView === 'flashcards' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-300'}`}>
                <div className="flex items-center space-x-3">
                  <Library className="w-4 h-4" />
                  <span>Flashcards</span>
                </div>
                <span className="bg-blue-500 text-[10px] px-1.5 py-0.5 rounded text-white font-bold tracking-wider">REV</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="p-6 bg-slate-950">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-slate-900 font-bold text-xs">ST</div>
            <div>
              <p className="text-xs font-bold">Student</p>
              <p className="text-[10px] text-slate-500">Exam Mode</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content View */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Dashboard Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-4">
             {showBack && (
               <button 
                 onClick={onBack}
                 className="p-1.5 rounded hover:bg-slate-100 transition-colors text-slate-600"
               >
                 <ArrowLeft className="w-4 h-4" />
               </button>
             )}
             {showBack && <div className="h-4 w-[1px] bg-slate-300 hidden sm:block"></div>}
            <h2 className="text-lg font-semibold">{title}</h2>
          </div>
          <div className="flex items-center space-x-3">
             {currentView === 'dashboard' && <button className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 shadow-sm transition-colors cursor-default">Ready</button>}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
