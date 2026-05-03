import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="inline-block p-1 rounded-full bg-gradient-to-r from-indigo-500/30 to-purple-500/30 mb-4 animate-float">
        <div className="px-4 py-1 rounded-full bg-slate-900/80 backdrop-blur text-sm font-medium text-indigo-300">
          ✨ AI-Powered Software Recommendations
        </div>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
        Find the perfect tool for your <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
          growing business.
        </span>
      </h1>
      
      <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
        Stop wasting time researching. Answer a few questions and our intelligent engine will recommend the exact CRM or Email Marketing platform you need to scale.
      </p>
      
      <div className="pt-8">
        <button 
          onClick={() => navigate('/wizard')}
          className="btn-primary text-lg px-8 py-4 shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)]"
        >
          Start Your Free Assessment
        </button>
      </div>

      {/* Decorative background elements */}
      <div className="fixed top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      <div className="fixed top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
    </div>
  );
}
