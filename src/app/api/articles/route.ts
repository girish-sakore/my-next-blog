import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const articles = await prisma.article.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(articles);
}

export async function POST(req: NextRequest) {
  const req_body = await req.json();
  const { title, body, references } = req_body;

  if (!title || !body) {
    return NextResponse.json({ error: 'Title and body are required' }, { status: 400 });
  }

  const article = await prisma.article.create({
    data: { title, body, references },
  });

  return NextResponse.json(article, { status: 201 });
}