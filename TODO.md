# TODO - Next Session

## UI/UX Improvements
- [ ] Convert all Tailwind CSS components to Mantine UI components
  - [ ] ChatInterface component - replace Tailwind with Mantine Button, TextInput, Select, Paper
  - [ ] Sidebar component - use Mantine Tabs, ActionIcon for close button
  - [ ] ProjectMemory component - use Mantine Card, TextInput, Textarea, Button
  - [ ] Learnings component - use Mantine Card, TextInput, Textarea, Button
  - [ ] Goals component - use Mantine Card, TextInput, Textarea, Select, Badge
- [ ] Add Mantine theme configuration with custom colors
- [ ] Implement responsive design for mobile/tablet views
- [ ] Add loading states and skeleton loaders for data fetching
- [ ] Add toast notifications for CRUD operations (success/error)

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
- [ ] Add pagination for memories, learnings, and goals
- [ ] Add search/filter functionality for each section
- [ ] Add tags/categories for memories and learnings
- [ ] Add priority field for goals
- [ ] Add due dates for goals
- [ ] Consider migrating from SQLite to PostgreSQL for production

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
- [ ] Update environment variables documentation
- [ ] Set up Vercel Postgres for production
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
1. Convert components to Mantine UI (start with ChatInterface)
2. Add toast notifications for better UX
3. Test the chat functionality with actual API keys
4. Fix any runtime errors that appear during testing
