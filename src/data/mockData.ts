import type { Question, Flashcard } from '../types';

export const readingGrammarQuestions: Question[] = [
  {
    id: 'rg1',
    text: 'If I _____ you were coming, I would have baked a cake.',
    options: ['know', 'knew', 'had known', 'have known'],
    correctAnswerIndex: 2,
    explanation: 'This is a third conditional sentence describing an unreal past situation.',
  },
  {
    id: 'rg2',
    text: 'Despite _____ extremely tired, she finished the report on time.',
    options: ['be', 'being', 'been', 'she was'],
    correctAnswerIndex: 1,
    explanation: 'Despite is a preposition and must be followed by a noun or gerund (V-ing).',
  }
];

export const readingVocabQuestions: Question[] = [
  {
    id: 'rv1',
    text: 'The new policy was implemented to _____ the negative effects of the economic downturn.',
    options: ['mitigate', 'exacerbate', 'ignite', 'obfuscate'],
    correctAnswerIndex: 0,
    explanation: 'Mitigate means to make something less severe or harmful.',
  }
];

export const readingConversationQuestions: Question[] = [
  {
    id: 'rc1',
    text: 'A: "Do you mind if I open the window?"\nB: "_____. It is quite stuffy in here."',
    options: ['Yes, I do', 'No, not at all', 'I would rather you did', "Please don't"],
    correctAnswerIndex: 1,
    explanation: 'Answering "No, not at all" means you do not mind, so they can open the window.',
  }
];

export const readingStoryQuestions: Question[] = [
  {
    id: 'rs1',
    text: 'What is the main purpose of the passage?',
    options: ['To explain the history of space exploration.', 'To argue for increased funding for NASA.', 'To describe the effects of microgravity on the human body.', 'To detail the construction of the International Space Station.'],
    correctAnswerIndex: 2,
    explanation: 'The majority of the passage details bone density loss and muscle atrophy in astronauts.',
    passage: 'Extended stays in space have profound effects on the human body. Without the constant pull of Earth\'s gravity, astronauts experience significant changes. The most notable is the loss of bone density, which can occur at a rate of 1% to 2% per month. Additionally, muscle atrophy is a major concern, as the muscles required for maintaining posture are largely unused in a microgravity environment.'
  }
];

export const listeningLongQuestions: Question[] = [
  {
    id: 'll1',
    text: 'What are the speakers mainly discussing?',
    options: ['A recent chemistry lecture.', 'A proposed change to the grading system.', 'The professor\'s new late policy.', 'An upcoming group project.'],
    correctAnswerIndex: 1,
    explanation: 'The conversation revolves around the university\'s proposal to switch from letter grades to a pass/fail system for freshman courses.',
    audioUrl: '#'
  }
];
export const listeningShortQuestions: Question[] = [
  {
    id: 'ls1',
    text: 'What does the man imply?',
    options: ['He wants to go home.', "He hasn't finished his work.", 'He needs a ride.', 'He likes the new office.'],
    correctAnswerIndex: 1,
    explanation: 'Based on the context (mock audio: "I still have a mountain of paperwork"), he implies he hasn\'t finished his work.',
    audioUrl: '#' // Simulated audio
  }
];

export const initialFlashcards: Flashcard[] = [
  { id: 'fc1', front: 'Mitigate', back: 'Make less severe, harmful, or painful' },
  { id: 'fc2', front: 'Exacerbate', back: 'Make a problem, bad situation, or negative feeling worse' },
  { id: 'fc3', front: 'Ubiquitous', back: 'Present, appearing, or found everywhere' }
];
