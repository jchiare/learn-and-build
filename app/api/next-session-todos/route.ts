import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { nextSessionTodos } from '@/lib/schema';
import { eq, asc, desc } from 'drizzle-orm';

export async function GET() {
  try {
    const todos = await db.select().from(nextSessionTodos).orderBy(asc(nextSessionTodos.order));
    return NextResponse.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, description } = await req.json();

    // Get the highest order value and add 1
    const [maxOrderResult] = await db.select({ order: nextSessionTodos.order })
      .from(nextSessionTodos)
      .orderBy(desc(nextSessionTodos.order))
      .limit(1);

    const [todo] = await db.insert(nextSessionTodos).values({
      title,
      description: description || '',
      order: (maxOrderResult?.order ?? -1) + 1,
    }).returning();
    return NextResponse.json(todo);
  } catch (error) {
    console.error('Error creating todo:', error);
    return NextResponse.json({ error: 'Failed to create todo' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, title, description, completed, order } = await req.json();
    const updateData: Partial<typeof nextSessionTodos.$inferInsert> = { updatedAt: new Date() };
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (completed !== undefined) updateData.completed = completed;
    if (order !== undefined) updateData.order = order;

    const [todo] = await db.update(nextSessionTodos)
      .set(updateData)
      .where(eq(nextSessionTodos.id, id))
      .returning();
    return NextResponse.json(todo);
  } catch (error) {
    console.error('Error updating todo:', error);
    return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    await db.delete(nextSessionTodos).where(eq(nextSessionTodos.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting todo:', error);
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 });
  }
}
