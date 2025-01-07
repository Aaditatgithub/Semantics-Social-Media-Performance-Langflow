import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="text-center">
        <div className="flex justify-center mb-12">
          <BarChart className="text-indigo-500" size={84} />
        </div>
        <h1 className="text-7xl font-bold text-white mb-6 tracking-tight">
          SocialPulse
        </h1>
        <p className="text-2xl text-gray-300 mb-12 max-w-2xl font-light">
          Transform your social media strategy with powerful analytics
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-white text-gray-900 font-medium px-8 py-3 rounded-full 
                   transition-all duration-300 transform hover:scale-105
                   hover:shadow-[0_0_2rem_0_rgba(255,255,255,0.3)]"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;