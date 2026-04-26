import { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Quiz from './components/Quiz';
import Flashcards from './components/Flashcards';
import type { QuizCategory } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'reading' | 'listening' | 'flashcards'>('dashboard');

  const handleBack = () => {
    setCurrentView('dashboard');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentView} />;
      case 'reading':
        return <Quiz category="Reading" />;
      case 'listening':
        return <Quiz category="Listening" />;
      case 'flashcards':
        return <Flashcards />;
      default:
        return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  const getTitle = () => {
    switch (currentView) {
      case 'reading': return 'Reading Test';
      case 'listening': return 'Listening Test';
      case 'flashcards': return 'Vocabulary Flashcards';
      default: return 'Dashboard';
    }
  };

  return (
    <Layout 
      title={getTitle()} 
      onBack={handleBack} 
      showBack={currentView !== 'dashboard'}
      currentView={currentView}
      onNavigate={setCurrentView}
    >
      {renderContent()}
    </Layout>
  );
}
