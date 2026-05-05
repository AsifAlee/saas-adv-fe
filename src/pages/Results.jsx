import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Results() {
  const navigate = useNavigate();
  const [platform, setPlatform] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('recommendation');
    if (data) {
      setPlatform(JSON.parse(data));
    } else {
      navigate('/wizard');
    }
  }, [navigate]);

  if (!platform) return null;

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in text-center">
      <div className="mb-4 text-indigo-400 font-semibold tracking-widest uppercase text-sm animate-float">
        Your Perfect Match
      </div>
      
      <h1 className="text-5xl font-extrabold mb-12">
        We recommend <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">{platform.name}</span>
      </h1>

      <div className="glass-card p-10 text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 blur-xl">
          <div className="w-32 h-32 bg-indigo-500 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 relative z-10">
          <div>
            <h3 className="text-2xl font-bold mb-4">Why {platform.name}?</h3>
            
            {platform.reason && (
              <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4 mb-6 italic text-indigo-200 text-sm">
                "{platform.reason}"
              </div>
            )}

            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              {platform.description}
            </p>
            
            <h4 className="font-semibold text-slate-200 mb-3">Key Features:</h4>
            <ul className="space-y-2 mb-8">
              {platform.features.map((feature, i) => (
                <li key={i} className="flex items-center text-slate-300">
                  <svg className="w-5 h-5 mr-3 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="text-xl font-medium text-slate-200">
              Starting at <span className="text-indigo-400 font-bold">${platform.startingPrice}/mo</span>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-6 bg-slate-900/50 p-8 rounded-2xl border border-white/5">
            <h3 className="text-xl font-semibold mb-2">Need expert help?</h3>
            <p className="text-slate-400 text-sm">
              Implementing a new tool can be daunting. Book a consultation or subscribe to our advisory service for hands-on setup and strategy.
            </p>
            <button 
              onClick={() => navigate('/pricing')}
              className="btn-primary w-full shadow-lg shadow-indigo-500/20"
            >
              View Implementation Plans
            </button>
            <a 
              href={platform.pricingUrl || '#'} 
              target="_blank" 
              rel="noreferrer"
              className="btn-secondary w-full text-center"
            >
              Sign up for {platform.name} directly
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
