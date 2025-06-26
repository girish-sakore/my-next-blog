import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
  } = req;

  const articleId = Number(id);

  if (isNaN(articleId)) {
    return res.status(400).json({ error: 'Invalid article ID' });
  }

  try {
    switch (method) {
      case 'GET': {
        const article = await prisma.article.findUnique({
          where: { id: articleId },
          include: {
            photos: { select: { url: true } },
          },
        });

        if (!article) return res.status(404).json({ error: 'Article not found' });
        return res.status(200).json(article);
      }

      case 'DELETE': {
        await prisma.photo.deleteMany({ where: { articleId } });
        await prisma.article.delete({ where: { id: articleId } });
        return res.status(200).json({ message: 'Article deleted' });
      }

      case 'PUT': {
        const { title, body, references } = req.body;

        if (!title || !body) {
          return res.status(400).json({ error: 'Title and body are required' });
        }

        const updated = await prisma.article.update({
          where: { id: articleId },
          data: { title, body, references },
        });

        return res.status(200).json(updated);
      }

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).json({ error: `Method ${method} Not Allowed` });
    }
  } catch (error) {
    console.error(`[${method}] Error:`, error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
