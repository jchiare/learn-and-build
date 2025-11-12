# LLM Chat App

A full-stack Next.js application for chatting with AI models (GPT-5/Sonnet 4.5) and managing project knowledge with an organized sidebar.

## Features

- **AI Chat Interface**: Chat with OpenAI GPT-5 (GPT-4o) or Anthropic Sonnet 4.5
- **Next Session Todos**: Track what you plan to accomplish in your next work session with progress tracking
- **Project Memory**: Store and manage important project information
- **Learning Section**: Keep track of relevant learnings and insights
- **Goals Tracking**: Manage high-level goals with status tracking (active, completed, archived)
- **Collapsible Sidebar**: Toggle sidebar visibility for focused chat experience
- **Real-time Updates**: React Query for efficient data fetching and caching

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Mantine UI
- **Database**: PostgreSQL (Supabase) with Prisma ORM
- **AI Integration**: Vercel AI SDK with OpenAI and Anthropic providers
- **State Management**: React Query (@tanstack/react-query)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase account (or any PostgreSQL database)
- OpenAI API key
- Anthropic API key

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd learn-and-build
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase Database:
   - Create a new project on [Supabase](https://supabase.com)
   - Get your connection strings from Project Settings > Database
   - Or use the Vercel Supabase Integration for automatic setup

4. Set up environment variables:
```bash
cp _env.example .env
```

Edit `.env` and add your credentials:
```
# Supabase PostgreSQL Connection
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres"

# AI API Keys
OPENAI_API_KEY=your_actual_openai_api_key
ANTHROPIC_API_KEY=your_actual_anthropic_api_key
```

5. Run database migrations:
```bash
npx prisma migrate dev
```

6. Start the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

The app uses five main models:

- **ChatMessage**: Stores chat history with role, content, and model
- **NextSessionTodo**: Stores todo items for the next work session with completion tracking
- **ProjectMemory**: Stores project-related memories
- **Learning**: Stores learnings and insights
- **Goal**: Stores goals with status tracking

## Project Structure

```
learn-and-build/
├── app/
│   ├── api/
│   │   ├── chat/              # AI chat endpoint
│   │   ├── next-session-todos/# Next session todos CRUD
│   │   ├── memory/            # Project memory CRUD
│   │   ├── learnings/         # Learnings CRUD
│   │   └── goals/             # Goals CRUD
│   ├── layout.tsx             # Root layout with providers
│   └── page.tsx               # Main page
├── components/
│   ├── ChatInterface.tsx      # Chat UI component
│   ├── Sidebar.tsx            # Sidebar with tabs
│   ├── NextSessionTodos.tsx   # Next session todos section
│   ├── ProjectMemory.tsx      # Project memory section
│   ├── Learnings.tsx          # Learning section
│   ├── Goals.tsx              # Goals section
│   └── Providers.tsx          # React Query + Mantine providers
├── lib/
│   └── prisma.ts              # Prisma client singleton
└── prisma/
    ├── schema.prisma          # Database schema
    └── migrations/            # Database migrations
```

## Deployment to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add the Supabase Integration in Vercel:
   - Go to your project settings in Vercel
   - Navigate to Integrations
   - Add the Supabase integration
   - This will automatically set up `DATABASE_URL` and `DIRECT_URL`
4. Add remaining environment variables in Vercel dashboard:
   - `OPENAI_API_KEY`
   - `ANTHROPIC_API_KEY`
5. Deploy!

**Note**: The Supabase integration will handle database connection pooling automatically for serverless functions.

## API Endpoints

- `POST /api/chat` - Stream AI responses
- `GET /api/next-session-todos` - Get all next session todos
- `POST /api/next-session-todos` - Create todo
- `PUT /api/next-session-todos` - Update todo
- `DELETE /api/next-session-todos?id=<id>` - Delete todo
- `GET /api/memory` - Get all memories
- `POST /api/memory` - Create memory
- `PUT /api/memory` - Update memory
- `DELETE /api/memory?id=<id>` - Delete memory
- Similar endpoints for `/api/learnings` and `/api/goals`

## License

MIT
