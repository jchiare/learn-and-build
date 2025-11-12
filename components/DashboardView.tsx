'use client';

import { KnowledgeCard } from './KnowledgeCard';
import { NextSessionTodos } from './NextSessionTodos';
import { ProjectMemory } from './ProjectMemory';
import { Learnings } from './Learnings';
import { Goals } from './Goals';
import { useQuery } from '@tanstack/react-query';

export function DashboardView() {
  // Fetch counts for each section
  const { data: todos = [] } = useQuery({
    queryKey: ['next-session-todos'],
    queryFn: async () => {
      const res = await fetch('/api/next-session-todos');
      if (!res.ok) throw new Error('Failed to fetch todos');
      return res.json();
    },
  });

  const { data: memories = [] } = useQuery({
    queryKey: ['memories'],
    queryFn: async () => {
      const res = await fetch('/api/memory');
      if (!res.ok) throw new Error('Failed to fetch memory');
      return res.json();
    },
  });

  const { data: learnings = [] } = useQuery({
    queryKey: ['learnings'],
    queryFn: async () => {
      const res = await fetch('/api/learnings');
      if (!res.ok) throw new Error('Failed to fetch learnings');
      return res.json();
    },
  });

  const { data: goals = [] } = useQuery({
    queryKey: ['goals'],
    queryFn: async () => {
      const res = await fetch('/api/goals');
      if (!res.ok) throw new Error('Failed to fetch goals');
      return res.json();
    },
  });

  const activeGoalsCount = goals.filter((g: any) => g.status === 'active').length;

  return (
    <div className="h-full p-4 bg-gray-50">
      {/* 2x2 Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
        {/* Top Left: Next Session Todos */}
        <KnowledgeCard
          title="Next Session Todos"
          icon="📝"
          count={todos.length}
          color="blue"
        >
          <NextSessionTodos />
        </KnowledgeCard>

        {/* Top Right: Goals */}
        <KnowledgeCard
          title="Active Goals"
          icon="🎯"
          count={activeGoalsCount}
          color="green"
        >
          <Goals />
        </KnowledgeCard>

        {/* Bottom Left: Project Memory */}
        <KnowledgeCard
          title="Project Memory"
          icon="🧠"
          count={memories.length}
          color="purple"
        >
          <ProjectMemory />
        </KnowledgeCard>

        {/* Bottom Right: Learnings */}
        <KnowledgeCard
          title="Learnings"
          icon="💡"
          count={learnings.length}
          color="amber"
        >
          <Learnings />
        </KnowledgeCard>
      </div>
    </div>
  );
}
