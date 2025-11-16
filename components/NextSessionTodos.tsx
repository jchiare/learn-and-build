'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, Checkbox, TextInput, Textarea, Progress, Button, Text, Stack, Group, ActionIcon, Box } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';

type NextSessionTodo = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export function NextSessionTodos() {
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: '', description: '' });

  const { data: todos = [] } = useQuery<NextSessionTodo[]>({
    queryKey: ['next-session-todos'],
    queryFn: async () => {
      const res = await fetch('/api/next-session-todos');
      if (!res.ok) {
        throw new Error('Failed to fetch todos');
      }
      return res.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: { title: string; description: string }) => {
      const res = await fetch('/api/next-session-todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['next-session-todos'] });
      setFormData({ title: '', description: '' });
      setIsAdding(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: Partial<NextSessionTodo> & { id: string }) => {
      const res = await fetch('/api/next-session-todos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['next-session-todos'] });
      setFormData({ title: '', description: '' });
      setIsAdding(false);
      setEditingId(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/next-session-todos?id=${id}`, { method: 'DELETE' });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['next-session-todos'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingId) {
      updateMutation.mutate({ id: editingId, ...formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleToggleComplete = (todo: NextSessionTodo) => {
    updateMutation.mutate({ id: todo.id, completed: !todo.completed });
  };

  const handleEdit = (todo: NextSessionTodo) => {
    setFormData({ title: todo.title, description: todo.description });
    setEditingId(todo.id);
    setIsAdding(true);
  };

  const handleCancel = () => {
    setFormData({ title: '', description: '' });
    setIsAdding(false);
    setEditingId(null);
  };

  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;

  return (
    <Stack gap="md" p="md">
      {/* Progress Bar */}
      {totalCount > 0 && (
        <Box>
          <Group justify="space-between" mb="xs">
            <Text size="xs" c="dimmed">Progress</Text>
            <Text size="xs" c="dimmed">{completedCount}/{totalCount}</Text>
          </Group>
          <Progress
            value={(completedCount / totalCount) * 100}
            size="sm"
            radius="xl"
            animated={completedCount < totalCount}
          />
        </Box>
      )}

      {!isAdding && (
        <Button onClick={() => setIsAdding(true)} fullWidth>
          + Add Todo
        </Button>
      )}

      {isAdding && (
        <Card padding="md" withBorder>
          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <TextInput
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="What needs to be done?"
                autoFocus
              />
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Additional details (optional)"
                rows={3}
              />
              <Group gap="xs">
                <Button variant="default" onClick={handleCancel} style={{ flex: 1 }}>
                  Cancel
                </Button>
                <Button type="submit" style={{ flex: 1 }}>
                  {editingId ? 'Update' : 'Add'}
                </Button>
              </Group>
            </Stack>
          </form>
        </Card>
      )}

      <Stack gap="sm">
        {todos.map((todo) => (
          <Card
            key={todo.id}
            padding="md"
            withBorder
            style={{ opacity: todo.completed ? 0.6 : 1 }}
          >
            <Group align="flex-start" wrap="nowrap">
              <Checkbox
                checked={todo.completed}
                onChange={() => handleToggleComplete(todo)}
                mt={4}
              />
              <Box style={{ flex: 1, minWidth: 0 }}>
                <Group justify="space-between" align="flex-start" mb={todo.description ? 'xs' : 0}>
                  <Text
                    fw={500}
                    style={{
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      flex: 1
                    }}
                  >
                    {todo.title}
                  </Text>
                  <Group gap="xs">
                    <ActionIcon
                      variant="subtle"
                      color="blue"
                      onClick={() => handleEdit(todo)}
                      size="sm"
                    >
                      <IconEdit size={16} />
                    </ActionIcon>
                    <ActionIcon
                      variant="subtle"
                      color="red"
                      onClick={() => deleteMutation.mutate(todo.id)}
                      size="sm"
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>
                </Group>
                {todo.description && (
                  <Text size="sm" c="dimmed" style={{ whiteSpace: 'pre-wrap' }}>
                    {todo.description}
                  </Text>
                )}
              </Box>
            </Group>
          </Card>
        ))}
      </Stack>

      {todos.length === 0 && !isAdding && (
        <Box ta="center" py="xl">
          <Text c="dimmed">No todos for next session yet.</Text>
          <Text size="sm" c="dimmed">Click "Add Todo" to get started!</Text>
        </Box>
      )}
    </Stack>
  );
}
