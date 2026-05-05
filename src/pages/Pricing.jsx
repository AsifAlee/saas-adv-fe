import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

// The publishable key provided by the user
const stripePromise = loadStripe('pk_test_51IiJTQDxVamFnVk1PVeJsXpwrNm7fwy3pS366FkQ3Cn4z1b6fVt93iM8Q8ZGcJtkr534GArqaBByqI62lm5b0KPS00n33bHr4U');

export default function Pricing() {
  const [loading, setLoading] = useState(null);

  const handleCheckout = async (planId) => {
    setLoading(planId);
    try {
      const baseUrl = import.meta.env.VITE_API_URL;
      const res = await fetch(`${baseUrl}/api/checkout/create-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId })
      });
      
      const session = await res.json();
      
      if (session.error) {
        throw new Error(session.error);
      }

      if (session.url) {
        window.location.href = session.url;
      }
    } catch (err) {
      console.error(err);
      alert('Payment failed to initialize.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Expert Implementation Services</h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Take the guesswork out of setup. Let our experts configure your new platform for maximum ROI.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Consultation Plan */}
        <div className="glass-card p-10 relative flex flex-col">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2">1-on-1 Strategy Call</h3>
            <p className="text-slate-400">A deep dive into your business needs and a tailored implementation roadmap.</p>
          </div>
          <div className="mb-8">
            <span className="text-5xl font-extrabold">$150</span>
            <span className="text-slate-400"> / one-time</span>
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-center text-slate-300">
              <span className="text-indigo-400 mr-2">✓</span> 60-minute expert consultation
            </li>
            <li className="flex items-center text-slate-300">
              <span className="text-indigo-400 mr-2">✓</span> Custom architecture map
            </li>
            <li className="flex items-center text-slate-300">
              <span className="text-indigo-400 mr-2">✓</span> Data migration strategy
            </li>
          </ul>
          <button 
            onClick={() => handleCheckout('consultation')}
            disabled={loading === 'consultation'}
            className="btn-secondary w-full"
          >
            {loading === 'consultation' ? 'Processing...' : 'Book Consultation'}
          </button>
        </div>

        {/* Subscription Plan */}
        <div className="glass-card p-10 relative flex flex-col border-indigo-500/50 shadow-[0_0_50px_-12px_rgba(99,102,241,0.3)]">
          <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">
            MOST POPULAR
          </div>
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2 text-indigo-300">Pro Advisory</h3>
            <p className="text-slate-400">Ongoing support and strategic guidance as your business grows.</p>
          </div>
          <div className="mb-8">
            <span className="text-5xl font-extrabold">$49</span>
            <span className="text-slate-400"> / month</span>
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-center text-slate-300">
              <span className="text-indigo-400 mr-2">✓</span> Everything in strategy call
            </li>
            <li className="flex items-center text-slate-300">
              <span className="text-indigo-400 mr-2">✓</span> Priority email support
            </li>
            <li className="flex items-center text-slate-300">
              <span className="text-indigo-400 mr-2">✓</span> Monthly check-in calls
            </li>
            <li className="flex items-center text-slate-300">
              <span className="text-indigo-400 mr-2">✓</span> Template & workflow reviews
            </li>
          </ul>
          <button 
            onClick={() => handleCheckout('subscription')}
            disabled={loading === 'subscription'}
            className="btn-primary w-full"
          >
            {loading === 'subscription' ? 'Processing...' : 'Subscribe Now'}
          </button>
        </div>
      </div>
    </div>
  );
}
