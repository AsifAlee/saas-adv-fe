import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Wizard() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/questions`);
        if (!res.ok) throw new Error('Failed to fetch questions');
        const data = await res.json();
        setQuestions(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load questions. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [baseUrl]);

  const handleSelect = (optionValue) => {
    const currentQ = questions[currentStep];
    const newAnswer = { questionId: currentQ.id, value: optionValue };
    
    // Update or add answer
    const existingIndex = answers.findIndex(a => a.questionId === currentQ.id);
    let newAnswers = [...answers];
    if (existingIndex >= 0) {
      newAnswers[existingIndex] = newAnswer;
    } else {
      newAnswers.push(newAnswer);
    }
    setAnswers(newAnswers);

    // Auto-advance after brief delay for UX
    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        submitAnswers(newAnswers);
      }
    }, 400);
  };

  const submitAnswers = async (finalAnswers) => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/api/recommend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: finalAnswers })
      });
      
      if (!res.ok) throw new Error('Failed to get recommendation');
      
      const recommendation = await res.json();
      // Store in local storage to access on results page
      localStorage.setItem('recommendation', JSON.stringify(recommendation));
      navigate('/results');
    } catch (err) {
      console.error(err);
      setError('Failed to calculate recommendation.');
      setLoading(false);
    }
  };

  if (loading) return <div className="text-xl animate-pulse">Loading...</div>;
  if (error) return <div className="text-red-400">{error}</div>;
  if (!questions.length) return <div>No questions found. Did you seed the DB?</div>;

  const currentQ = questions[currentStep];

  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between text-sm text-slate-400 mb-2">
          <span>Step {currentStep + 1} of {questions.length}</span>
          <span>{Math.round(((currentStep) / questions.length) * 100)}% Completed</span>
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="glass-card p-10 relative overflow-hidden">
        <h2 className="text-3xl font-bold mb-8 text-center">{currentQ.text}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQ.options.map(option => {
            const isSelected = answers.find(a => a.questionId === currentQ.id)?.value === option.value;
            return (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`wizard-option ${isSelected ? 'selected' : ''}`}
              >
                <span className="text-lg font-medium">{option.text}</span>
              </button>
            );
          })}
        </div>
        
        {/* Navigation if needed (we auto-advance currently, but back button is good) */}
        <div className="mt-8 flex justify-between">
          <button 
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            className={`btn-secondary ${currentStep === 0 ? 'invisible' : ''}`}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
