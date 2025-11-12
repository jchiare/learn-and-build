'use client';

import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { ChatInterface } from '@/components/ChatInterface';
import { Sidebar } from '@/components/Sidebar';

export default function Home() {
  const [selectedModel, setSelectedModel] = useState<'gpt-5' | 'sonnet-4.5'>('sonnet-4.5');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: {
      model: selectedModel,
    },
  });

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Main Chat Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <ChatInterface
          messages={messages}
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </div>

      {/* Sidebar */}
      {isSidebarOpen && <Sidebar onClose={() => setIsSidebarOpen(false)} />}
    </div>
  );
}
