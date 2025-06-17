'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ArticleForm from '@/components/ArticleForm';

export default function NewArticle() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(title: string, body: string) {
    setLoading(true);
    setError('');

    if (!title || !body) {
      setError('Title and body are required');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body }),
      });

      if (!res.ok) {
        throw new Error('Failed to publish the article');
      }

      const data = await res.json();
      router.push(`/articles/${data.id}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">New Article</h1>
      <ArticleForm
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </main>
  );
}