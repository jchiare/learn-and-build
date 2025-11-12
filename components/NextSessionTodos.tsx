'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

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
    <div className="space-y-3">
      {/* Progress Bar */}
      {totalCount > 0 && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-600">
            <span>Progress</span>
            <span>{completedCount}/{totalCount}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>
      )}

      {!isAdding && (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          + Add Todo
        </button>
      )}

      {isAdding && (
        <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-gray-50 rounded-lg">
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="What needs to be done?"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Additional details (optional)"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              {editingId ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-2">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`p-3 bg-white border border-gray-200 rounded-lg ${
              todo.completed ? 'opacity-60' : ''
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleComplete(todo)}
                className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3
                    className={`font-medium text-gray-800 ${
                      todo.completed ? 'line-through' : ''
                    }`}
                  >
                    {todo.title}
                  </h3>
                  <div className="flex space-x-2 flex-shrink-0">
                    <button
                      onClick={() => handleEdit(todo)}
                      className="text-blue-600 hover:text-blue-800 text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteMutation.mutate(todo.id)}
                      className="text-red-600 hover:text-red-800 text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {todo.description && (
                  <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">
                    {todo.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {todos.length === 0 && !isAdding && (
        <div className="text-center py-8 text-gray-400">
          <p>No todos for next session yet.</p>
          <p className="text-sm">Click &quot;Add Todo&quot; to get started!</p>
        </div>
      )}
    </div>
  );
}
