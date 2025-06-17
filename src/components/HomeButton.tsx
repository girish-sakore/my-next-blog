'use client';

export default function HomeButton({ title }: { title?: string }) {
  return (
    <button 
      onClick={() => window.location.href = '/'} 
      className="text-sm px-4 py-2 border text-gray-700 rounded hover:bg-gray-300"
    >
      { title ? title : 'Back to Home' }
    </button>
  );
}
