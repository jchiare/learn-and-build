# TODO - Next Session

## UI/UX Improvements
- [ ] Convert all Tailwind CSS components to Mantine UI components
  - [ ] ChatInterface component - replace Tailwind with Mantine Button, TextInput, Select, Paper
  - [ ] Sidebar component - use Mantine Tabs, ActionIcon for close button
  - [ ] NextSessionTodos component - use Mantine Card, Checkbox, TextInput, Textarea, Progress
  - [ ] ProjectMemory component - use Mantine Card, TextInput, Textarea, Button
  - [ ] Learnings component - use Mantine Card, TextInput, Textarea, Button
  - [ ] Goals component - use Mantine Card, TextInput, Textarea, Select, Badge
- [ ] Add Mantine theme configuration with custom colors
- [ ] Implement responsive design for mobile/tablet views
- [ ] Add loading states and skeleton loaders for data fetching
- [ ] Add toast notifications for CRUD operations (success/error)
- [ ] Add drag-and-drop reordering for Next Session todos

## Features
- [ ] Persist chat messages to database
- [ ] Add chat history view/search
- [ ] Add markdown rendering for AI responses
- [ ] Add syntax highlighting for code blocks in chat
- [ ] Add copy button for code blocks
- [ ] Add clear chat button
- [ ] Add export chat history feature
- [ ] Add keyboard shortcuts (e.g., Cmd/Ctrl+K for focus on chat input)

## Database & Backend
- [x] Migrated to PostgreSQL (Supabase)
- [x] Added Next Session Todos feature with completion tracking
- [ ] Add pagination for memories, learnings, goals, and next session todos
- [ ] Add search/filter functionality for each section
- [ ] Add tags/categories for memories and learnings
- [ ] Add priority field for goals and next session todos
- [ ] Add due dates for goals and next session todos
- [ ] Optimize database queries with proper indexing

## AI Integration
- [ ] Add streaming indicator/animation
- [ ] Add token usage tracking
- [ ] Add conversation context management (limit context window)
- [ ] Add ability to regenerate AI responses
- [ ] Add model-specific settings (temperature, max tokens, etc.)
- [ ] Add ability to switch models mid-conversation

## Code Quality
- [ ] Add error boundaries for React components
- [ ] Add proper error handling for API routes
- [ ] Add input validation (both client and server-side)
- [ ] Add rate limiting for API endpoints
- [ ] Add API response types/schemas
- [ ] Add unit tests for components
- [ ] Add integration tests for API routes
- [ ] Add E2E tests with Playwright

## Deployment & DevOps
- [x] Updated environment variables documentation for Supabase
- [x] Configured Prisma for PostgreSQL with connection pooling
- [ ] Deploy to Vercel and set up Supabase integration
- [ ] Add proper error logging (Sentry/LogRocket)
- [ ] Add analytics (optional)
- [ ] Set up CI/CD pipeline
- [ ] Add production build optimization

## Documentation
- [ ] Add component documentation with Storybook
- [ ] Add API documentation
- [ ] Create user guide
- [ ] Add development setup guide
- [ ] Add contribution guidelines

## Immediate Priority (Start Here)
1. Set up Supabase database and run migrations
2. Deploy to Vercel with Supabase integration
3. Test the Next Session Todos feature
4. Convert components to Mantine UI (start with ChatInterface and NextSessionTodos)
5. Add toast notifications for better UX
6. Test the chat functionality with actual API keys
7. Fix any runtime errors that appear during testing
