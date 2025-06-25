'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ArticleForm from '@/components/ArticleForm';

export default function NewArticle() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(title: string, body: string, references: string[] = [], photos?: File[]) {
    setLoading(true);
    setError('');

    if (!title || !body) {
      setError('Title and body are required');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
            formData.append('title', title);
            formData.append('body', body);
            references.forEach(ref => formData.append('references[]', ref));
            if (photos) {
              photos.forEach(photo => formData.append('photos', photo));
            }

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/articles`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Failed to publish the article');
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
      <h1 className="text-2xl font-bold mb-4">New Article</h1>
      <ArticleForm
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </main>
  );
}