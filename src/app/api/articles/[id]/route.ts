import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_: NextRequest, context: { params: { id: string } }) {
  const { id } = await context.params;

  const article = await prisma.article.findUnique({
    where: { id: Number(id) },
  });

  if (!article) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }

  return NextResponse.json(article);
}

export async function DELETE(_: NextRequest, context: { params: { id: string } }) {
  const { id } = await context.params;

  try {
    await prisma.article.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: 'Article deleted' });
  } catch {
    return NextResponse.json({ error: 'Delete failed or article not found' }, { status: 400 });
  }
}
