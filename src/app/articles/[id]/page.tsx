import DeleteArticle from '@/components/DeleteArticle';
import HomeButton from '@/components/HomeButton';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Article = {
  id: number;
  title: string;
  body: string;
  references?: string[];
  createdAt: string;
};

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  
  const { id: articleId } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/articles/${articleId}`, {
    cache: 'no-store',
  });

  if (!res.ok) return notFound();

  const article: Article = await res.json();

  if (!article) return notFound();

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        <div>
          <Link href={`/articles/${article.id}/edit`}>
            <button className="mx-2 px-4 py-2 text-sm border text-white rounded hover:bg-gray-900">
              Edit
            </button>
          </Link>
          <DeleteArticle id={article.id}/>
          <HomeButton />
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-6">
        Posted on {new Date(article.createdAt).toLocaleString()}
      </p>
      <article className="text-lg leading-relaxed whitespace-pre-wrap">
        {article.body}
      </article>
      <div className="text-sm italic font-serif font-thin mt-6">
        <h2 className="mb-2">References</h2>
        <ul className="list-disc pl-5">
          {article.references && article.references.length > 0 ? (
            article.references.map((ref, index) => (
              <li key={index} className="mb-1">{ref}</li>
            ))
          ) : (
            <li>No references available.</li>
          )}
        </ul>
      </div>
    </main>
  );
}
