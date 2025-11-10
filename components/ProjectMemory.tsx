'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Memory {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export default function ProjectMemory() {
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: '', content: '' });

  const { data: memories = [] } = useQuery<Memory[]>({
    queryKey: ['memories'],
    queryFn: async () => {
      const res = await fetch('/api/memory');
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
    <div className="p-4 space-y-4">
      {!isAdding && (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          + Add Memory
        </button>
      )}

      {isAdding && (
        <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-gray-50 rounded-lg">
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Title"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Content"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex space-x-2">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              {editingId ? 'Update' : 'Save'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {memories.map((memory) => (
          <div key={memory.id} className="p-4 bg-white border border-gray-200 rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-gray-800">{memory.title}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(memory)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteMutation.mutate(memory.id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">{memory.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
