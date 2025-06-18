'use client';

import { useState } from 'react';
import HomeButton from './HomeButton';

export default function ArticleForm({
  initialTitle = '',
  initialBody = '',
  initialReferences = [],
  onSubmit,
  loading,
  error,
}: {
  initialTitle?: string;
  initialBody?: string;
  initialReferences?: string[];
  onSubmit: (title: string, body: string, references: string[]) => void;
  loading: boolean;
  error: string;
}) {

  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const [references, setReferences] = useState(initialReferences);
  const [newReference, setNewReference] = useState('');

  function handleSubmit(e: React.FormEvent) {
    console.log('Submitting article:', { title, body, references });
    e.preventDefault();
    onSubmit(title, body, references);
  }

  function handleAddReference() {
    if (newReference.trim() !== '') {
      setReferences([...references, newReference.trim()]);
      setNewReference('');
    }
  }

  function handleRemoveReference(index: number) {
    setReferences(references.filter((_, i) => i !== index));
  }

  if (title === undefined || body === undefined) {
    return <p>Loading...</p>;
  }

  return (
    <form className="space-y-4">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <input
        className="w-full p-2 border rounded focus:outline-green-200"
        type="text"
        value={title}
        onChange={(e) => {setTitle(e.target.value)}}
        placeholder="Title"
      />
      <textarea
        className="w-full p-2 border rounded focus:outline-green-200"
        value={body}
        onChange={(e) => {setBody(e.target.value)}}
        placeholder="Body"
      />
      <div>
        <label className="block mb-2">References</label>
        <div className="flex space-x-2 mb-4">
          <input
            className="w-full p-2 border rounded focus:outline-green-200"
            type="text"
            value={newReference}
            onChange={(e) => setNewReference(e.target.value)}
            placeholder="Add a reference"
          />
          <button
            className="px-4 py-2 border text-white rounded hover:bg-green-900"
            type="button"
            onClick={handleAddReference}
          >
            Add
          </button>
        </div>
        <ul className="space-y-2">
          {references.map((ref, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{ref}</span>
              <button
                className="text-red-900 hover:underline"
                type="button"
                onClick={() => handleRemoveReference(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button
        className="mr-2 px-4 py-2 border text-white rounded hover:bg-gray-900"
        type="submit"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Submit'}
      </button>
      <HomeButton title="Cancel" />
    </form>
  );
}