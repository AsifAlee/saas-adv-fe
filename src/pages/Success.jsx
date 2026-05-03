import { useNavigate, useSearchParams } from 'react-router-dom';

export default function Success() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="glass-card p-12 text-center max-w-2xl mx-auto animate-fade-in">
      <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-slate-300 text-lg mb-8">
        Thank you for your purchase. We've received your payment and our team will be in touch shortly to get started.
      </p>
      {sessionId && (
        <p className="text-sm text-slate-500 mb-8 font-mono">
          Order ID: {sessionId.slice(0, 15)}...
        </p>
      )}
      <button 
        onClick={() => navigate('/')}
        className="btn-primary"
      >
        Return Home
      </button>
    </div>
  );
}
