import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Wizard from './pages/Wizard';
import Results from './pages/Results';
import Pricing from './pages/Pricing';
import Success from './pages/Success';

function App() {
  return (
    <div className="min-h-screen">
      {/* Simple Header */}
      <header className="absolute top-0 w-full z-50 p-6 flex justify-between items-center">
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
          SaaSAdviser
        </div>
      </header>

      <main className="pt-24 min-h-screen flex flex-col items-center justify-center p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wizard" element={<Wizard />} />
          <Route path="/results" element={<Results />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
