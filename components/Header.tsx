
import React from 'react';
import { LeafIcon } from './icons/Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-3">
          <LeafIcon className="h-8 w-8 text-green-600" />
          <h1 className="text-2xl font-bold text-green-800">
            Vibe-Coded Garden
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
