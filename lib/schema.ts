import { pgTable, text, timestamp, boolean, integer, index } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

export const chatMessages = pgTable('ChatMessage', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  role: text('role').notNull(), // "user" or "assistant"
  content: text('content').notNull(),
  model: text('model').notNull(), // "gpt-5" or "sonnet-4.5"
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).defaultNow().notNull().$onUpdate(() => new Date()),
});

export const projectMemories = pgTable('ProjectMemory', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  title: text('title').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).defaultNow().notNull().$onUpdate(() => new Date()),
});

export const learnings = pgTable('Learning', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  title: text('title').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).defaultNow().notNull().$onUpdate(() => new Date()),
});

export const goals = pgTable('Goal', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  title: text('title').notNull(),
  description: text('description').notNull(),
  status: text('status').default('active').notNull(), // "active", "completed", "archived"
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).defaultNow().notNull().$onUpdate(() => new Date()),
});

export const nextSessionTodos = pgTable('NextSessionTodo', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  title: text('title').notNull(),
  description: text('description').default('').notNull(),
  completed: boolean('completed').default(false).notNull(),
  order: integer('order').default(0).notNull(),
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).defaultNow().notNull().$onUpdate(() => new Date()),
}, (table) => [
  index('NextSessionTodo_order_idx').on(table.order),
]);
