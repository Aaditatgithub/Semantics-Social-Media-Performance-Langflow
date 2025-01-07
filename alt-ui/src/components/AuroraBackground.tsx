import React from 'react';

const AuroraBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Aurora effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="aurora-blur-1"></div>
        <div className="aurora-blur-2"></div>
        <div className="aurora-blur-3"></div>
      </div>
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AuroraBackground;