'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, TextInput, Textarea, Button, Text, Stack, Group, ActionIcon, Badge, Select, Box } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';

type Goal = {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export function Goals() {
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: '', description: '', status: 'active' });

  const { data: goals = [] } = useQuery<Goal[]>({
    queryKey: ['goals'],
    queryFn: async () => {
      const res = await fetch('/api/goals');
      return res.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: { title: string; description: string; status: string }) => {
      const res = await fetch('/api/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      setFormData({ title: '', description: '', status: 'active' });
      setIsAdding(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...data }: { id: string; title: string; description: string; status: string }) => {
      const res = await fetch('/api/goals', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...data }),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      setFormData({ title: '', description: '', status: 'active' });
      setIsAdding(false);
      setEditingId(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/goals?id=${id}`, { method: 'DELETE' });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) return;

    if (editingId) {
      updateMutation.mutate({ id: editingId, ...formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (goal: Goal) => {
    setFormData({ title: goal.title, description: goal.description, status: goal.status });
    setEditingId(goal.id);
    setIsAdding(true);
  };

  const handleCancel = () => {
    setFormData({ title: '', description: '', status: 'active' });
    setIsAdding(false);
    setEditingId(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'green';
      case 'completed':
        return 'blue';
      case 'archived':
        return 'gray';
      default:
        return 'gray';
    }
  };

  return (
    <Stack gap="md" p="md">
      {!isAdding && (
        <Button onClick={() => setIsAdding(true)} fullWidth>
          + Add Goal
        </Button>
      )}

      {isAdding && (
        <Card padding="md" withBorder>
          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <TextInput
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Title"
                autoFocus
              />
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Description"
                rows={4}
              />
              <Select
                value={formData.status}
                onChange={(value) => setFormData({ ...formData, status: value || 'active' })}
                data={[
                  { value: 'active', label: 'Active' },
                  { value: 'completed', label: 'Completed' },
                  { value: 'archived', label: 'Archived' }
                ]}
              />
              <Group gap="xs">
                <Button variant="default" onClick={handleCancel} style={{ flex: 1 }}>
                  Cancel
                </Button>
                <Button type="submit" style={{ flex: 1 }}>
                  {editingId ? 'Update' : 'Save'}
                </Button>
              </Group>
            </Stack>
          </form>
        </Card>
      )}

      <Stack gap="md">
        {goals.map((goal) => (
          <Card key={goal.id} padding="md" withBorder>
            <Group justify="space-between" align="flex-start" mb="sm">
              <Box style={{ flex: 1 }}>
                <Text fw={600} mb="xs">{goal.title}</Text>
                <Badge color={getStatusColor(goal.status)} variant="light" size="sm">
                  {goal.status}
                </Badge>
              </Box>
              <Group gap="xs">
                <ActionIcon
                  variant="subtle"
                  color="blue"
                  onClick={() => handleEdit(goal)}
                  size="sm"
                >
                  <IconEdit size={16} />
                </ActionIcon>
                <ActionIcon
                  variant="subtle"
                  color="red"
                  onClick={() => deleteMutation.mutate(goal.id)}
                  size="sm"
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            </Group>
            <Text size="sm" c="dimmed" style={{ whiteSpace: 'pre-wrap' }}>
              {goal.description}
            </Text>
          </Card>
        ))}
      </Stack>

      {goals.length === 0 && !isAdding && (
        <Box ta="center" py="xl">
          <Text c="dimmed">No goals yet.</Text>
        </Box>
      )}
    </Stack>
  );
}
