import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const article = await prisma.article.findUnique({
    where: { id: Number(id) },
  });

  if (!article) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }

  return NextResponse.json(article);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await prisma.article.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: 'Article deleted' });
  } catch {
    return NextResponse.json(
      { error: 'Delete failed or article not found' },
      { status: 400 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { title, body: content } = body;

  if (!title ||!content) {
    return NextResponse.json(
      { error: 'Title and body are required' },
      { status: 400 }
    );
  }

  try {
    const article = await prisma.article.update({
      where: { id: Number(id) },
      data: { title, body: content },
    });
    return NextResponse.json(article);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Update failed or article not found'},
      { status: 404 }
    );
  }
}