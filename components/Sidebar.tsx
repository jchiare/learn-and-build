'use client';

import { useState } from 'react';
import { ProjectMemory } from './ProjectMemory';
import { Learnings } from './Learnings';
import { Goals } from './Goals';
import { NextSessionTodos } from './NextSessionTodos';
import { Paper, Tabs, ActionIcon, Box, Text } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

type SidebarProps = {
  onClose: () => void;
};

export function Sidebar({ onClose }: SidebarProps) {
  const [activeSection, setActiveSection] = useState<string>('next-session');

  return (
    <Paper
      w={384}
      style={{
        borderLeft: '1px solid var(--mantine-color-gray-3)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
      radius={0}
    >
      {/* Header */}
      <Box p="md" style={{ borderBottom: '1px solid var(--mantine-color-gray-3)' }}>
        <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text size="lg" fw={600}>Project Workspace</Text>
          <ActionIcon variant="subtle" color="gray" onClick={onClose}>
            <IconX size={20} />
          </ActionIcon>
        </Box>
      </Box>

      {/* Tabs */}
      <Tabs value={activeSection} onChange={(value) => setActiveSection(value || 'next-session')} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Tabs.List>
          <Tabs.Tab value="next-session" style={{ flex: 1, fontSize: '0.75rem' }}>
            Next Session
          </Tabs.Tab>
          <Tabs.Tab value="memory" style={{ flex: 1, fontSize: '0.75rem' }}>
            Memory
          </Tabs.Tab>
          <Tabs.Tab value="learning" style={{ flex: 1, fontSize: '0.75rem' }}>
            Learning
          </Tabs.Tab>
          <Tabs.Tab value="goals" style={{ flex: 1, fontSize: '0.75rem' }}>
            Goals
          </Tabs.Tab>
        </Tabs.List>

        <Box style={{ flex: 1, overflowY: 'auto' }}>
          <Tabs.Panel value="next-session">
            <NextSessionTodos />
          </Tabs.Panel>
          <Tabs.Panel value="memory">
            <ProjectMemory />
          </Tabs.Panel>
          <Tabs.Panel value="learning">
            <Learnings />
          </Tabs.Panel>
          <Tabs.Panel value="goals">
            <Goals />
          </Tabs.Panel>
        </Box>
      </Tabs>
    </Paper>
  );
}
