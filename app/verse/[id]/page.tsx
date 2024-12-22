'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { verses } from '@/data/verses';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function VersePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [verse, setVerse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  // Use an effect to unwrap params and find the verse
  useEffect(() => {
    const fetchVerse = async () => {
      const resolvedParams = await params;
      const foundVerse = verses.find((v) => v.id === resolvedParams.id);
      setVerse(foundVerse);
      setLoading(false);
    };

    fetchVerse();
  }, [params]);

  const nextVerse = () => {
    if (Number(verse.id) >= verses.length - 1) {
      router.push(`/verse/${1}`);
      return;
    }

    router.push(`/verse/${Number(verse.id) + 1}`);
  };

  const previousVerse = () => {
    if (Number(verse.id) <= 1) {
      router.push(`/verse/${verses.length - 1}`);
      return;
    }

    router.push(`/verse/${Number(verse.id) - 1}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!verse) {
    return <div>Verse not found</div>;
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${verse.text} - ${verse.reference}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className='min-h-screen p-8 flex flex-col items-center justify-center'>
        <div className='bg-white p-8 border-4 border-black shadow-[12px_12px_0_0_#000] max-w-2xl w-full'>
          <h1 className='text-4xl font-bold mb-8 text-center'>
            {verse.reference}
          </h1>
          <p className='md:text-2xl mb-8'>{verse.text}</p>
          <div className='flex flex-col gap-3 md:justify-between md:items-center md:flex-row md:gap-0'>
            <Link
              href={`/category/${verse.category.toLowerCase()}`}
              className='bg-black text-white text-center px-4 py-2 font-bold hover:bg-gray-800 transition-colors duration-300'
            >
              More {verse.category} Verses
            </Link>
            <button
              onClick={copyToClipboard}
              className='bg-black text-white px-4 py-2 font-bold hover:bg-gray-800 transition-colors duration-300'
            >
              {copied ? 'Copied!' : 'Copy Verse'}
            </button>
          </div>
          <div className='flex items-center justify-center mt-6'>
            <ChevronLeft
              size={60}
              color='black'
              className='cursor-pointer p-2'
              onClick={previousVerse}
            />
            <ChevronRight
              size={60}
              color='black'
              className='cursor-pointer p-2'
              onClick={nextVerse}
            />
          </div>
        </div>
        <Link
          href='/'
          className='mt-8 bg-black text-white px-6 py-3 font-bold hover:bg-gray-800 transition-colors duration-300'
        >
          Back to Home
        </Link>
      </div>

      <div className='absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]'>
        <div className='fixed bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]'></div>
      </div>
    </>
  );
}
