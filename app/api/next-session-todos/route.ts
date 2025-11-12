import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const todos = await prisma.nextSessionTodo.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(todos);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, description } = await req.json();

    // Get the highest order value and add 1
    const maxOrder = await prisma.nextSessionTodo.findFirst({
      orderBy: { order: 'desc' },
      select: { order: true },
    });

    const todo = await prisma.nextSessionTodo.create({
      data: {
        title,
        description: description || '',
        order: (maxOrder?.order ?? -1) + 1,
      },
    });
    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create todo' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, title, description, completed, order } = await req.json();
    const todo = await prisma.nextSessionTodo.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(completed !== undefined && { completed }),
        ...(order !== undefined && { order }),
      },
    });
    return NextResponse.json(todo);
  } catch (error) {
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
    await prisma.nextSessionTodo.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 });
  }
}
