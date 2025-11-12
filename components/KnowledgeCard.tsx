'use client';

import { ReactNode } from 'react';

type KnowledgeCardProps = {
  title: string;
  icon: string;
  count: number;
  color: 'blue' | 'green' | 'purple' | 'amber';
  children: ReactNode;
  onAdd?: () => void;
};

const colorClasses = {
  blue: {
    border: 'border-gray-300',
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    badge: 'bg-gray-600 text-white',
    header: 'bg-gray-100',
  },
  green: {
    border: 'border-gray-300',
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    badge: 'bg-gray-600 text-white',
    header: 'bg-gray-100',
  },
  purple: {
    border: 'border-gray-300',
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    badge: 'bg-gray-600 text-white',
    header: 'bg-gray-100',
  },
  amber: {
    border: 'border-gray-300',
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    badge: 'bg-gray-600 text-white',
    header: 'bg-gray-100',
  },
};

export function KnowledgeCard({ title, icon, count, color, children, onAdd }: KnowledgeCardProps) {
  const colors = colorClasses[color];

  return (
    <div className={`flex flex-col bg-white rounded-lg border ${colors.border} shadow-sm overflow-hidden h-full`}>
      {/* Header */}
      <div className={`px-4 py-3 ${colors.header} border-b ${colors.border} flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          <h3 className={`font-semibold ${colors.text} text-sm`}>{title}</h3>
          <span className={`${colors.badge} text-xs font-medium px-2 py-0.5 rounded-full`}>
            {count}
          </span>
        </div>
        {onAdd && (
          <button
            onClick={onAdd}
            className={`${colors.text} hover:opacity-70 transition-opacity`}
            title={`Add ${title}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        )}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {children}
      </div>
    </div>
  );
}
