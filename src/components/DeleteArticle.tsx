'use client';

export default function DeleteArticle({ id }: { id: number }) {
  const handleDelete = async () => {
    const response = await fetch(`/api/articles/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      window.location.href = '/';
    } else {
      const errorData = await response.json();
      alert(errorData.error || 'Failed to delete article');
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-sm mr-2 px-4 py-2 bg-black-500 border text-white rounded hover:bg-red-600 hover:text-red-100"
    >
      Delete Article
    </button>
  );
}