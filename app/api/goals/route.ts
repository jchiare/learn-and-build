import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { goals } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET() {
  try {
    const allGoals = await db.select().from(goals).orderBy(desc(goals.updatedAt));
    return NextResponse.json(allGoals);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch goals' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, description, status } = await req.json();
    const [goal] = await db.insert(goals).values({
      title,
      description,
      status: status || 'active',
    }).returning();
    return NextResponse.json(goal);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create goal' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, title, description, status } = await req.json();
    const [goal] = await db.update(goals)
      .set({ title, description, status, updatedAt: new Date() })
      .where(eq(goals.id, id))
      .returning();
    return NextResponse.json(goal);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update goal' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    await db.delete(goals).where(eq(goals.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete goal' }, { status: 500 });
  }
}
