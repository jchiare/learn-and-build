'use client';

import { useState } from 'react';
import { ProjectMemory } from './ProjectMemory';
import { Learnings } from './Learnings';
import { Goals } from './Goals';
import { NextSessionTodos } from './NextSessionTodos';

type SidebarProps = {
  onClose: () => void;
};

export function Sidebar({ onClose }: SidebarProps) {
  const [activeSection, setActiveSection] = useState<'next-session' | 'memory' | 'learning' | 'goals'>('next-session');

  return (
    <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Project Workspace</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 overflow-x-auto">
        <button
          onClick={() => setActiveSection('next-session')}
          className={`flex-1 px-3 py-3 text-xs font-medium transition-colors whitespace-nowrap ${
            activeSection === 'next-session'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Next Session
        </button>
        <button
          onClick={() => setActiveSection('memory')}
          className={`flex-1 px-3 py-3 text-xs font-medium transition-colors whitespace-nowrap ${
            activeSection === 'memory'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Memory
        </button>
        <button
          onClick={() => setActiveSection('learning')}
          className={`flex-1 px-3 py-3 text-xs font-medium transition-colors whitespace-nowrap ${
            activeSection === 'learning'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Learning
        </button>
        <button
          onClick={() => setActiveSection('goals')}
          className={`flex-1 px-3 py-3 text-xs font-medium transition-colors whitespace-nowrap ${
            activeSection === 'goals'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Goals
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeSection === 'next-session' && <NextSessionTodos />}
        {activeSection === 'memory' && <ProjectMemory />}
        {activeSection === 'learning' && <Learnings />}
        {activeSection === 'goals' && <Goals />}
      </div>
    </div>
  );
}
