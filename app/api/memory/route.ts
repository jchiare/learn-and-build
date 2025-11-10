import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const memories = await prisma.projectMemory.findMany({
      orderBy: { updatedAt: 'desc' },
    });
    return NextResponse.json(memories);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch memories' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, content } = await req.json();
    const memory = await prisma.projectMemory.create({
      data: { title, content },
    });
    return NextResponse.json(memory);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create memory' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, title, content } = await req.json();
    const memory = await prisma.projectMemory.update({
      where: { id },
      data: { title, content },
    });
    return NextResponse.json(memory);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update memory' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    await prisma.projectMemory.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete memory' }, { status: 500 });
  }
}
