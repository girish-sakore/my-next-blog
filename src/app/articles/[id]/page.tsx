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
  photos?: { url: string }[];
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
    <div>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        <div className="min-w-max">
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
      {article.photos && article.photos.length > 0 && (
        <section className="mt-8">
          {/* <h2 className="text-xl font-semibold mb-2">Photos</h2> */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {article.photos.map((photo, index) => (
              <div key={index} className="overflow-hidden rounded border border-gray-300 shadow">
                <img
                  src={photo.url}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}
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
    </div>
  );
}
