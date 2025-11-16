'use client';

import { UIMessage } from 'ai';
import { FormEvent, ChangeEvent } from 'react';
import { Paper, TextInput, Button, Select, Box, Text, Group, Loader, Stack } from '@mantine/core';

type ChatInterfaceProps = {
  messages: UIMessage[];
  input?: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  selectedModel: 'gpt-5' | 'sonnet-4.5';
  setSelectedModel: (model: 'gpt-5' | 'sonnet-4.5') => void;
  toggleSidebar: () => void;
};

export function ChatInterface({
  messages,
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  selectedModel,
  setSelectedModel,
  toggleSidebar,
}: ChatInterfaceProps) {
  return (
    <>
      {/* Header */}
      <Paper shadow="sm" p="md" radius={0} withBorder style={{ borderLeft: 'none', borderRight: 'none', borderTop: 'none' }}>
        <Group justify="space-between">
          <Group gap="md">
            <Text size="xl" fw={600}>LLM Chat</Text>
            <Select
              value={selectedModel}
              onChange={(value) => setSelectedModel(value as 'gpt-5' | 'sonnet-4.5')}
              data={[
                { value: 'gpt-5', label: 'GPT-5 (GPT-4o)' },
                { value: 'sonnet-4.5', label: 'Sonnet 4.5' }
              ]}
              size="sm"
              w={200}
            />
          </Group>
          <Button variant="subtle" onClick={toggleSidebar}>
            Toggle Sidebar
          </Button>
        </Group>
      </Paper>

      {/* Messages */}
      <Box style={{ flex: 1, overflowY: 'auto' }} p="lg">
        <Stack gap="md">
          {messages.length === 0 && (
            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <Text c="dimmed">Start a conversation with your AI assistant</Text>
            </Box>
          )}
          {messages.map((message) => (
            <Box
              key={message.id}
              style={{ display: 'flex', justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start' }}
            >
              <Paper
                p="md"
                radius="md"
                style={{
                  maxWidth: '70%',
                  backgroundColor: message.role === 'user' ? 'var(--mantine-color-blue-6)' : undefined,
                  color: message.role === 'user' ? 'white' : undefined
                }}
                withBorder={message.role !== 'user'}
              >
                <Text style={{ whiteSpace: 'pre-wrap' }}>
                  {message.parts
                    .map(part => (part.type === 'text' ? part.text : ''))
                    .join('')}
                </Text>
              </Paper>
            </Box>
          ))}
          {isLoading && (
            <Box style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Paper p="md" radius="md" withBorder style={{ maxWidth: '70%' }}>
                <Group gap="xs">
                  <Loader size="xs" />
                  <Text c="dimmed" size="sm">Thinking...</Text>
                </Group>
              </Paper>
            </Box>
          )}
        </Stack>
      </Box>

      {/* Input */}
      <Paper shadow="sm" p="lg" radius={0} withBorder style={{ borderLeft: 'none', borderRight: 'none', borderBottom: 'none' }}>
        <form onSubmit={handleSubmit}>
          <Group gap="md" align="flex-start">
            <TextInput
              style={{ flex: 1 }}
              value={input || ''}
              onChange={handleInputChange}
              placeholder="Type your message..."
              disabled={isLoading}
              size="md"
            />
            <Button
              type="submit"
              disabled={isLoading || !input?.trim()}
              size="md"
            >
              Send
            </Button>
          </Group>
        </form>
      </Paper>
    </>
  );
}
