'use client';

import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { ChatInterface } from '@/components/ChatInterface';
import { DashboardView } from '@/components/DashboardView';

export default function Home() {
  const [selectedModel, setSelectedModel] = useState<'gpt-5' | 'sonnet-4.5'>('sonnet-4.5');
  const [isDashboardVisible, setIsDashboardVisible] = useState(true);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: {
      model: selectedModel,
    },
  });

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Chat Area - 60% width on desktop */}
      <div className={`flex flex-col transition-all duration-300 ${
        isDashboardVisible ? 'w-full lg:w-3/5' : 'w-full'
      }`}>
        <ChatInterface
          messages={messages}
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          toggleSidebar={() => setIsDashboardVisible(!isDashboardVisible)}
        />
      </div>

      {/* Dashboard Panel - 40% width on desktop */}
      {isDashboardVisible && (
        <div className="hidden lg:block lg:w-2/5 border-l border-gray-200 overflow-hidden">
          <DashboardView />
        </div>
      )}

      {/* Mobile/Tablet Dashboard Overlay */}
      {isDashboardVisible && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Knowledge Dashboard</h2>
            <button
              onClick={() => setIsDashboardVisible(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <DashboardView />
        </div>
      )}
    </div>
  );
}
