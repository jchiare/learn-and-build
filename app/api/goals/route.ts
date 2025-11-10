import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const goals = await prisma.goal.findMany({
      orderBy: { updatedAt: 'desc' },
    });
    return NextResponse.json(goals);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch goals' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, description, status } = await req.json();
    const goal = await prisma.goal.create({
      data: { title, description, status: status || 'active' },
    });
    return NextResponse.json(goal);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create goal' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, title, description, status } = await req.json();
    const goal = await prisma.goal.update({
      where: { id },
      data: { title, description, status },
    });
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
    await prisma.goal.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete goal' }, { status: 500 });
  }
}
