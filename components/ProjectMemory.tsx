'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, TextInput, Textarea, Button, Text, Stack, Group, ActionIcon, Box } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';

type Memory = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export function ProjectMemory() {
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: '', content: '' });

  const { data: memories = [] } = useQuery<Memory[]>({
    queryKey: ['memories'],
    queryFn: async () => {
      const res = await fetch('/api/memory');
      if (!res.ok) {
        throw new Error('Failed to fetch memories');
      }
      return res.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: { title: string; content: string }) => {
      const res = await fetch('/api/memory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memories'] });
      setFormData({ title: '', content: '' });
      setIsAdding(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...data }: { id: string; title: string; content: string }) => {
      const res = await fetch('/api/memory', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...data }),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memories'] });
      setFormData({ title: '', content: '' });
      setIsAdding(false);
      setEditingId(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/memory?id=${id}`, { method: 'DELETE' });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memories'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;

    if (editingId) {
      updateMutation.mutate({ id: editingId, ...formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (memory: Memory) => {
    setFormData({ title: memory.title, content: memory.content });
    setEditingId(memory.id);
    setIsAdding(true);
  };

  const handleCancel = () => {
    setFormData({ title: '', content: '' });
    setIsAdding(false);
    setEditingId(null);
  };

  return (
    <Stack gap="md" p="md">
      {!isAdding && (
        <Button onClick={() => setIsAdding(true)} fullWidth>
          + Add Memory
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
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Content"
                rows={4}
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
        {memories.map((memory) => (
          <Card key={memory.id} padding="md" withBorder>
            <Group justify="space-between" align="flex-start" mb="sm">
              <Text fw={600} style={{ flex: 1 }}>{memory.title}</Text>
              <Group gap="xs">
                <ActionIcon
                  variant="subtle"
                  color="blue"
                  onClick={() => handleEdit(memory)}
                  size="sm"
                >
                  <IconEdit size={16} />
                </ActionIcon>
                <ActionIcon
                  variant="subtle"
                  color="red"
                  onClick={() => deleteMutation.mutate(memory.id)}
                  size="sm"
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            </Group>
            <Text size="sm" c="dimmed" style={{ whiteSpace: 'pre-wrap' }}>
              {memory.content}
            </Text>
          </Card>
        ))}
      </Stack>

      {memories.length === 0 && !isAdding && (
        <Box ta="center" py="xl">
          <Text c="dimmed">No memories yet.</Text>
        </Box>
      )}
    </Stack>
  );
}
