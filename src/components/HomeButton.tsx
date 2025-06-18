'use client';

import { useRouter } from 'next/navigation';

export default function HomeButton({ title }: { title?: string }) {
  const router = useRouter();

  return (
    <button 
      onClick={() => {
        if (title) {
          router.back();
        } else {
          router.push('/');
        }
      }}
      className="text-sm px-4 py-2 border text-gray-700 rounded hover:bg-gray-300"
    >
      { title ? title : 'Back to Home' }
    </button>
  );
}
