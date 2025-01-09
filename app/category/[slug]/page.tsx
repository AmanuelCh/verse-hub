'use client';

import { verses } from '@/data/verses';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

// Define the type for params
type Params = {
  slug: string;
};

export default function CategoryPage({ params }: { params: Promise<Params> }) {
  // Use React's use hook to unwrap params
  const { slug } = React.use(params);

  const categorySlug = slug.charAt(0).toUpperCase() + slug.slice(1);
  const category = decodeURIComponent(categorySlug);
  const categoryVerses = verses.filter(
    (verse) => verse.category.toLowerCase() === category.toLowerCase()
  );

  const [randomVerse, setRandomVerse] = useState(categoryVerses[0]);
  const [randomIndex, setRandomIndex] = useState(
    Math.floor(Math.random() * categoryVerses.length)
  );

  const handleRandomize = () => {
    setRandomIndex(Math.floor(Math.random() * categoryVerses.length));
  };

  useEffect(() => {
    if (categoryVerses.length > 0) {
      setRandomVerse(categoryVerses[randomIndex]);
    }
  }, [randomIndex, categoryVerses]);

  return (
    <>
      <div className='absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]'>
        <div className='fixed bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]'></div>
      </div>

      <div className='min-h-screen p-8 max-w-5xl mx-auto'>
        <h1 className='text-4xl font-bold mb-8 text-center'>{category}</h1>
        {categoryVerses.length > 0 && (
          <p className='mb-8 text-center'>{categoryVerses[0].categoryDesc}</p>
        )}

        <div className='mb-8 bg-white p-6 border-4 border-black shadow-[8px_8px_0_0_#000]'>
          <h2 className='text-2xl font-bold mb-4'>Random {category} Verse</h2>
          <p className='md:text-xl mb-4'>{randomVerse.text}</p>
          <p className='text-right font-bold'>{randomVerse.reference}</p>
          <div className='mt-4 flex items-center justify-center'>
            <button
              className='bg-black text-white px-6 py-3 font-bold hover:bg-gray-800 transition-colors duration-300'
              onClick={handleRandomize}
            >
              Randomize
            </button>
          </div>
        </div>

        <div className='my-7'>
          <h2 className='text-3xl font-bold text-center'>
            All Verses in this Category
          </h2>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {categoryVerses.map((verse) => (
            <Link
              href={`/verse/${verse.id}`}
              key={verse.id}
            >
              <div className='bg-white p-6 border-4 border-black shadow-[8px_8px_0_0_#000] hover:shadow-[12px_12px_0_0_#000] transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1'>
                <p className='text-xl mb-4'>{verse.text.slice(0, 50)}...</p>
                <p className='text-right font-bold'>{verse.reference}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className='mt-8 text-center'>
          <Link
            href='/'
            className='bg-black text-white px-6 py-3 font-bold hover:bg-gray-800 transition-colors duration-300'
          >
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}
