import Link from 'next/link';

type Article = {
  id: number;
  title: string;
  createdAt: string;
};

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/articles`, {
    next: { revalidate: 0 }, // disable caching for dev
  });

  const articles: Article[] = await res.json();

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-6">Articles</h1>
        <div className="mb-4">
          <Link href="/articles/new">
            <button className="px-4 py-2 border text-white rounded hover:bg-gray-900">
              Add New Article
            </button>
          </Link>
        </div>
      </div>
      <ul className="space-y-4">
        {articles.map(article => (
          <li key={article.id} className="p-4 border rounded shadow hover:bg-gray-900">
            <Link href={`/articles/${article.id}`}>
              <h2 className="text-xl font-semibold hover:underline">{article.title}</h2>
            </Link>
            <p className="text-sm text-gray-500">
              Posted on {new Date(article.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
