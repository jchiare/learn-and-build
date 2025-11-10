# LLM Chat App

A full-stack Next.js application for chatting with AI models (GPT-5/Sonnet 4.5) and managing project knowledge with an organized sidebar.

## Features

- **AI Chat Interface**: Chat with OpenAI GPT-5 (GPT-4o) or Anthropic Sonnet 4.5
- **Project Memory**: Store and manage important project information
- **Learning Section**: Keep track of relevant learnings and insights
- **Goals Tracking**: Manage high-level goals with status tracking (active, completed, archived)
- **Collapsible Sidebar**: Toggle sidebar visibility for focused chat experience
- **Real-time Updates**: React Query for efficient data fetching and caching

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **AI Integration**: Vercel AI SDK with OpenAI and Anthropic providers
- **State Management**: React Query (@tanstack/react-query)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
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

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your API keys:
```
DATABASE_URL="file:./dev.db"
OPENAI_API_KEY=your_actual_openai_api_key
ANTHROPIC_API_KEY=your_actual_anthropic_api_key
```

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

The app uses four main models:

- **ChatMessage**: Stores chat history with role, content, and model
- **ProjectMemory**: Stores project-related memories
- **Learning**: Stores learnings and insights
- **Goal**: Stores goals with status tracking

## Project Structure

```
learn-and-build/
├── app/
│   ├── api/
│   │   ├── chat/          # AI chat endpoint
│   │   ├── memory/        # Project memory CRUD
│   │   ├── learnings/     # Learnings CRUD
│   │   └── goals/         # Goals CRUD
│   ├── generated/         # Prisma client
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Main page
├── components/
│   ├── ChatInterface.tsx  # Chat UI component
│   ├── Sidebar.tsx        # Sidebar with tabs
│   ├── ProjectMemory.tsx  # Project memory section
│   ├── Learnings.tsx      # Learning section
│   ├── Goals.tsx          # Goals section
│   └── Providers.tsx      # React Query provider
├── lib/
│   └── prisma.ts          # Prisma client singleton
└── prisma/
    ├── schema.prisma      # Database schema
    └── migrations/        # Database migrations
```

## Deployment to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard:
   - `DATABASE_URL` (use Vercel Postgres or another production database)
   - `OPENAI_API_KEY`
   - `ANTHROPIC_API_KEY`
4. Deploy!

**Note**: For production, consider using a production-ready database like Vercel Postgres or PostgreSQL instead of SQLite.

## API Endpoints

- `POST /api/chat` - Stream AI responses
- `GET /api/memory` - Get all memories
- `POST /api/memory` - Create memory
- `PUT /api/memory` - Update memory
- `DELETE /api/memory?id=<id>` - Delete memory
- Similar endpoints for `/api/learnings` and `/api/goals`

## License

MIT
