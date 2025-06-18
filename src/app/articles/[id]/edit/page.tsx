'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ArticleForm from '@/components/ArticleForm';

export default function EditArticle({ params }: { params: Promise<{ id: string }> }) {
  const [articleId, setArticleId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [references, setReferences] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await params;
      setArticleId(resolvedParams.id);
    }

    fetchParams();
  });

  useEffect(() => {
    if (articleId!== null && articleId!== undefined) {
      fetchArticle();
    }
  }, [articleId]);

  async function fetchArticle() {
    try {
      setLoading(true);
      const res = await fetch(`/api/articles/${articleId}`);
      if (!res.ok) {
        throw new Error('Failed to fetch article');
      }
      const data = await res.json();
      if (!data) {
        throw new Error('Article not found');
      }
      console.log('Fetched article:=>', data);
      setTitle(data.title);
      setBody(data.body);
      if (data.references) {
        setReferences(data.references);
      } else {
        setReferences([]);
      }
      console.log('references state:=>', references);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    }
     finally {
      setLoading(false);
    }
  }

  async function handleSubmit(updatedTitle: string, updatedBody: string, updatedReferences: string[] = []) {
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/articles/${articleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: updatedTitle, body: updatedBody, references: updatedReferences }),
      });

      if (!res.ok) {
        throw new Error('Failed to update the article');
      }

      const data = await res.json();
      router.push(`/articles/${data.id}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Article</h1>
      { (!loading) ? (
        <ArticleForm
        initialTitle={title}
        initialBody={body}
        initialReferences={references}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
      ) : (
        <p>Loading...</p>
      )}
      
    </main>
  );
}