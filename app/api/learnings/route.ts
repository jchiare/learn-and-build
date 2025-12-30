import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { learnings } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET() {
  try {
    const allLearnings = await db.select().from(learnings).orderBy(desc(learnings.updatedAt));
    return NextResponse.json(allLearnings);
  } catch (error) {
    console.error('Error fetching learnings:', error);
    return NextResponse.json({ error: 'Failed to fetch learnings' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, content } = await req.json();
    const [learning] = await db.insert(learnings).values({
      title,
      content,
    }).returning();
    return NextResponse.json(learning);
  } catch (error) {
    console.error('Error creating learning:', error);
    return NextResponse.json({ error: 'Failed to create learning' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, title, content } = await req.json();
    const [learning] = await db.update(learnings)
      .set({ title, content, updatedAt: new Date() })
      .where(eq(learnings.id, id))
      .returning();
    return NextResponse.json(learning);
  } catch (error) {
    console.error('Error updating learning:', error);
    return NextResponse.json({ error: 'Failed to update learning' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    await db.delete(learnings).where(eq(learnings.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting learning:', error);
    return NextResponse.json({ error: 'Failed to delete learning' }, { status: 500 });
  }
}
