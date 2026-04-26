import { useState, useEffect } from 'react';
import { initialFlashcards } from '../data/mockData';
import type { Flashcard } from '../types';
import { Plus, Trash2, RotateCw, ChevronLeft, ChevronRight, ArrowLeft, Library, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { generateFlashcards } from '../services/geminiService';

export default function Flashcards() {
  const [cards, setCards] = useState<Flashcard[]>(() => {
    const saved = localStorage.getItem('muelt_flashcards');
    return saved ? JSON.parse(saved) : initialFlashcards;
  });

  const [mode, setMode] = useState<'list' | 'study'>('list');
  const [newFront, setNewFront] = useState('');
  const [newBack, setNewBack] = useState('');
  
  // AI Generate state
  const [aiKeyword, setAiKeyword] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiError, setAiError] = useState('');
  
  // Study mode state
  const [studyIndex, setStudyIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    localStorage.setItem('muelt_flashcards', JSON.stringify(cards));
  }, [cards]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFront.trim() || !newBack.trim()) return;
    
    const newCard: Flashcard = {
      id: Date.now().toString(),
      front: newFront.trim(),
      back: newBack.trim()
    };
    
    setCards([newCard, ...cards]);
    setNewFront('');
    setNewBack('');
  };

  const handleAIGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiKeyword.trim() || isGenerating) return;

    setIsGenerating(true);
    setAiError('');
    try {
      const generated = await generateFlashcards(aiKeyword);
      const newCards: Flashcard[] = generated.map(item => ({
        id: Date.now().toString() + Math.random().toString(36).substring(7),
        front: item.front,
        back: item.back
      }));
      setCards(prev => [...newCards, ...prev]);
      setAiKeyword('');
    } catch (err) {
      setAiError('Failed to generate cards. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDelete = (id: string) => {
    setCards(cards.filter(c => c.id !== id));
  };

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setStudyIndex(i => (i + 1) % cards.length);
    }, 150);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setStudyIndex(i => (i - 1 + cards.length) % cards.length);
    }, 150);
  };

  if (mode === 'study') {
    if (cards.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-slate-500 mb-4">You have no flashcards to study.</p>
          <button onClick={() => setMode('list')} className="text-blue-600 underline text-sm">Go back to list</button>
        </div>
      );
    }

    const card = cards[studyIndex];

    return (
      <div className="max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => setMode('list')} className="text-xs font-bold text-slate-500 hover:text-slate-800 uppercase tracking-wider flex items-center gap-1">
             <ArrowLeft className="w-3 h-3" /> Exit Mode
          </button>
          <span className="text-[10px] font-bold bg-slate-200 text-slate-700 px-2 py-1 rounded uppercase tracking-widest">
            {studyIndex + 1} / {cards.length}
          </span>
        </div>

        <div className="relative h-64 sm:h-80 w-full perspective-1000 mb-8 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={isFlipped ? 'back' : 'front'}
              initial={{ rotateY: isFlipped ? -90 : 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: isFlipped ? 90 : -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 w-full h-full"
              style={{ backfaceVisibility: 'hidden' }}
            >
               <div className={`w-full h-full rounded-xl p-8 flex flex-col items-center justify-center text-center border border-slate-200 shadow-lg
                  ${isFlipped ? 'bg-gradient-to-br from-blue-50 to-indigo-50 text-slate-800' : 'bg-gradient-to-br from-white to-slate-50 text-slate-900'}`
               }>
                 <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 absolute top-6 left-6">{isFlipped ? 'Definition' : 'Term'}</span>
                 <p className="text-xl md:text-2xl font-bold leading-tight">
                   {isFlipped ? card.back : card.front}
                 </p>
                 <div className="absolute bottom-6 right-6 flex items-center gap-1.5 text-slate-400">
                    <RotateCw className="w-3.5 h-3.5" />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Flip</span>
                 </div>
               </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-4">
           <button onClick={prevCard} className="px-5 py-2.5 bg-white rounded border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors text-slate-600 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
             <ChevronLeft className="w-4 h-4" /> Prev
           </button>
           <button onClick={nextCard} className="px-5 py-2.5 bg-white rounded border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors text-slate-600 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
             Next <ChevronRight className="w-4 h-4" />
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold">Vocabulary Flashcards</h2>
          <div className="h-4 w-[1px] bg-slate-300 hidden sm:block"></div>
          <span className="text-xs text-slate-500 hidden sm:block">{cards.length} Cards Total</span>
        </div>
        <button
          onClick={() => setMode('study')}
          disabled={cards.length === 0}
          className="bg-blue-600 text-white px-4 py-2 rounded text-xs font-medium hover:bg-blue-700 shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Study All
        </button>
      </div>

      {/* Add Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Add Custom Card Form */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">Add Custom Card</h3>
          <form onSubmit={handleAdd} className="flex flex-col gap-3">
            <div className="space-y-1">
              <label className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">Front (Term)</label>
              <input 
                type="text" 
                value={newFront}
                onChange={e => setNewFront(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="e.g. Acknowledge"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">Back (Definition)</label>
              <input 
                type="text" 
                value={newBack}
                onChange={e => setNewBack(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="e.g. To accept or admit..."
              />
            </div>
            <button 
              type="submit"
              className="w-full mt-2 bg-slate-100 text-slate-700 px-4 py-2 flex items-center justify-center gap-1.5 rounded text-xs font-bold hover:bg-slate-200 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Term
            </button>
          </form>
        </div>

        {/* AI Generate Form */}
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-xl border border-blue-100 shadow-sm flex flex-col">
          <h3 className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-3 flex items-center gap-1"><Sparkles className="w-3 h-3"/> Generate with AI</h3>
          <form onSubmit={handleAIGenerate} className="flex flex-col gap-3 flex-1">
            <div className="space-y-1 flex-1">
              <label className="text-[11px] text-blue-700 uppercase tracking-wider font-semibold">Topic Keyword</label>
              <input 
                type="text" 
                value={aiKeyword}
                onChange={e => setAiKeyword(e.target.value)}
                disabled={isGenerating}
                className="w-full bg-white border border-blue-200 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
                placeholder="e.g. Science, Economics, History"
              />
              <p className="text-[10px] text-blue-500/70 mt-1">Generates 10 university-level words.</p>
              {aiError && <p className="text-xs text-red-500 font-medium mt-2">{aiError}</p>}
            </div>
            <button 
              type="submit"
              disabled={isGenerating || !aiKeyword.trim()}
              className="w-full mt-auto bg-blue-600 text-white px-4 py-2 flex items-center justify-center gap-1.5 rounded text-xs font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isGenerating ? 'Generating Cards...' : 'Generate 10 Cards'}
            </button>
          </form>
        </div>
      </div>

      {/* List of cards */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {cards.map(card => (
            <div key={card.id} className="aspect-[4/3] bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col justify-between relative group">
              <button 
                onClick={() => handleDelete(card.id)}
                className="absolute top-2 right-2 p-1.5 text-slate-300 hover:text-red-500 rounded bg-white border border-slate-100 shadow-sm opacity-0 group-hover:opacity-100 transition-all z-10"
              >
                 <Trash2 className="w-3 h-3" />
              </button>
              <p className="text-sm font-semibold pr-6 break-words line-clamp-2">{card.front}</p>
              <p className="text-[10px] text-slate-500 italic line-clamp-3">{card.back}</p>
            </div>
          ))}
          {cards.length === 0 && (
            <div className="aspect-[4/3] border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <Library className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-medium text-slate-500">No Cards</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
