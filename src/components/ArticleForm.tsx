'use client';

import { useState } from 'react';
import HomeButton from './HomeButton';

export default function ArticleForm({
  initialTitle = '',
  initialBody = '',
  onSubmit,
  loading,
  error,
}: {
  initialTitle?: string;
  initialBody?: string;
  onSubmit: (title: string, body: string) => void;
  loading: boolean;
  error: string;
}) {
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);

  function handleSubmit(e: React.FormEvent) {
    console.log('Submitting article:', { title, body });
    e.preventDefault();
    onSubmit(title, body);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <input
        className="w-full p-2 border rounded focus:outline-green-200"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        className="w-full p-2 border rounded focus:outline-green-200"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Body"
      />
      <button
        className="mr-2 px-4 py-2 border text-white rounded hover:bg-gray-900"
        type="submit"
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Submit'}
      </button>
      <HomeButton title="Cancel" />
    </form>
  );
}