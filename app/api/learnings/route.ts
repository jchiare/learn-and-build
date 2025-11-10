import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const learnings = await prisma.learning.findMany({
      orderBy: { updatedAt: 'desc' },
    });
    return NextResponse.json(learnings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch learnings' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, content } = await req.json();
    const learning = await prisma.learning.create({
      data: { title, content },
    });
    return NextResponse.json(learning);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create learning' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, title, content } = await req.json();
    const learning = await prisma.learning.update({
      where: { id },
      data: { title, content },
    });
    return NextResponse.json(learning);
  } catch (error) {
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
    await prisma.learning.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete learning' }, { status: 500 });
  }
}
