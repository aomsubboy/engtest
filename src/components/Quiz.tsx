import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, ArrowRight, PlayCircle } from 'lucide-react';
import type { Question, QuizCategory, ReadingSubCategory, ListeningSubCategory } from '../types';
import { readingGrammarQuestions, readingVocabQuestions, readingConversationQuestions, readingStoryQuestions, listeningShortQuestions, listeningLongQuestions } from '../data/mockData';

interface QuizProps {
  category: QuizCategory;
}

export default function Quiz({ category }: QuizProps) {
  const [subCategory, setSubCategory] = useState<ReadingSubCategory | ListeningSubCategory | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const readingCats: ReadingSubCategory[] = ['Grammar', 'Vocab', 'Conversation', 'Story'];
  const listeningCats: ListeningSubCategory[] = ['Short Conversation', 'Long Conversation'];

  const handleStart = (subCat: string) => {
    setSubCategory(subCat as any);
    if (subCat === 'Grammar') setQuestions(readingGrammarQuestions);
    else if (subCat === 'Vocab') setQuestions(readingVocabQuestions);
    else if (subCat === 'Conversation') setQuestions(readingConversationQuestions);
    else if (subCat === 'Story') setQuestions(readingStoryQuestions);
    else if (subCat === 'Short Conversation') setQuestions(listeningShortQuestions);
    else if (subCat === 'Long Conversation') setQuestions(listeningLongQuestions);
    else setQuestions(readingGrammarQuestions);
    
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === questions[currentIndex].correctAnswerIndex) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(c => c + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
    }
  };

  if (!subCategory) {
    const cats = category === 'Reading' ? readingCats : listeningCats;
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <h2 className="text-lg font-semibold text-slate-800">Select {category} Section</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cats.map(cat => (
            <button
              key={cat}
              onClick={() => handleStart(cat)}
              className="p-5 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:bg-blue-50/50 shadow-sm text-left transition-all flex justify-between items-center group"
            >
              <div>
                <h3 className="text-sm font-bold text-slate-800">{cat}</h3>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">Practice {cat.toLowerCase()}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center max-w-lg mx-auto mt-10">
        <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Quiz Completed!</h2>
        <p className="text-sm text-slate-500 mb-6 font-medium">You scored {score} out of {questions.length}</p>
        <button
          onClick={() => setSubCategory(null)}
          className="bg-slate-900 text-white px-6 py-2.5 rounded font-medium hover:bg-slate-800 transition-colors text-sm"
        >
          Practice Another Section
        </button>
      </div>
    );
  }

  const question = questions[currentIndex];

  if (!question) return <div className="text-sm text-slate-500 text-center py-8">No questions available for this section yet.</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center space-x-4 mb-6">
        <h2 className="text-lg font-semibold">{category}: {subCategory}</h2>
        <div className="h-4 w-[1px] bg-slate-300 hidden sm:block"></div>
        <span className="text-xs text-slate-500">Question {currentIndex + 1} of {questions.length}</span>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
        {question.passage && (
          <div className="mb-6 p-4 bg-slate-50 rounded italic text-slate-700 text-sm leading-relaxed border-l-2 border-slate-300">
            {question.passage}
          </div>
        )}
        
        {question.audioUrl && (
          <div className="mb-6 flex items-center gap-3 p-3 bg-slate-50 rounded border border-slate-200">
            <button className="text-blue-600 hover:text-blue-700 transition-colors">
              <PlayCircle className="w-8 h-8" />
            </button>
            <div>
              <p className="text-xs font-bold text-slate-800">Listen to the conversation</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">Audio track {currentIndex + 1}</p>
            </div>
          </div>
        )}

        <h3 className="text-sm font-semibold text-slate-900 mb-5 leading-normal">
          {question.text}
        </h3>

        <div className="space-y-2">
          {question.options.map((opt, idx) => {
            let btnClass = "w-full text-left p-3 rounded border transition-all text-sm ";
            let icon = null;

            if (selectedAnswer === null) {
              btnClass += "border-slate-200 hover:border-blue-400 hover:bg-slate-50 text-slate-700 font-medium";
            } else if (idx === question.correctAnswerIndex) {
              btnClass += "border-green-500 bg-green-50 text-green-800 font-bold";
              icon = <CheckCircle2 className="w-4 h-4 text-green-600" />;
            } else if (idx === selectedAnswer) {
              btnClass += "border-red-500 bg-red-50 text-red-800 font-bold";
              icon = <XCircle className="w-4 h-4 text-red-600" />;
            } else {
              btnClass += "border-slate-200 bg-white opacity-50 text-slate-500";
            }

            return (
              <button
                key={idx}
                disabled={selectedAnswer !== null}
                onClick={() => handleAnswer(idx)}
                className={btnClass + " flex justify-between items-center"}
              >
                <span>{opt}</span>
                {icon}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-blue-50 p-5 rounded-lg border border-blue-200 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
              <div>
                <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-1">Explanation</h4>
                <p className="text-blue-800 text-xs leading-relaxed">{question.explanation}</p>
              </div>
              <button
                onClick={handleNext}
                className="shrink-0 bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 text-xs"
              >
                Next <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
