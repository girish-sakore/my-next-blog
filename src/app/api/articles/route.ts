import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const articles = await prisma.article.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(articles);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, body: content } = body;

  if (!title || !content) {
    return NextResponse.json({ error: 'Title and body are required' }, { status: 400 });
  }

  const article = await prisma.article.create({
    data: { title, body: content },
  });

  return NextResponse.json(article, { status: 201 });
}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  const { id } = await context.params;
  const body = await req.json();
  const { title, body: content } = body;

  if (!title || !content) {
    return NextResponse.json({ error: 'Title and body are required' }, { status: 400 });
  }

  try {
    const article = await prisma.article.update({
      where: { id: Number(id) },
      data: { title, body: content },
    });
    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json({ error: 'Update failed or article not found' }, { status: 404 });
  }
}
