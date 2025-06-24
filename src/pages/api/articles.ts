import type { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { prisma } from '@/lib/prisma';

type ResponseData =
  | { error: string }
  | { id: number }
  | {
      id: number;
      title: string;
      body: string;
      createdAt: Date;
      references: string[];
      photos: { url: string }[];
    }[];

const uploadDir = path.join(process.cwd(), 'public/uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  if (req.method === 'GET') {
    try {
      const articles = await prisma.article.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          photos: { select: { url: true } },
        },
      });
      return res.status(200).json(articles);
    } catch (error) {
      console.error('GET error:', error);
      return res.status(500).json({ error: 'Failed to fetch articles' });
    }
  }

  if (req.method === 'POST') {
    // @ts-expect-error Multer types
    upload.array('photos')(req, res, async (err: unknown) => {
      if (err) {
        console.error('Upload error:', err);
        return res.status(500).json({ error: 'File upload failed' });
      }

      try {
        const { title, body } = req.body;
        const references = req.body['references[]']
          ? Array.isArray(req.body['references[]'])
            ? req.body['references[]']
            : [req.body['references[]']]
          : [];

        if (!title || !body) {
          return res.status(400).json({ error: 'Title and body are required' });
        }

        const article = await prisma.article.create({
          data: {
            title,
            body,
            references,
          },
        });

        const files = (req as NextApiRequest & { files: Express.Multer.File[] }).files;
        if (files && files.length > 0) {
          await Promise.all(
            files.map((file) =>
              prisma.photo.create({
                data: {
                  url: `/uploads/${file.filename}`,
                  articleId: article.id,
                },
              })
            )
          );
        }

        res.status(201).json({ id: article.id });
      } catch (error) {
        console.error('POST error:', error);
        res.status(500).json({ error: 'Server error' });
      }
    });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ error: 'Method not allowed' });
  }
};

// Disable body parsing for multer
export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
