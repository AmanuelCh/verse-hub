import { verses } from '@/data/verses';
import Link from 'next/link';

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Await the params to get the slug
  const { slug } = await params;

  const categorySlug = slug.charAt(0).toUpperCase() + slug.slice(1);
  const category = decodeURIComponent(categorySlug);
  const categoryVerses = verses.filter(
    (verse) => verse.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <>
      <div className='absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]'>
        <div className='fixed bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]'></div>
      </div>

      <div className='min-h-screen p-8 max-w-5xl mx-auto'>
        <h1 className='text-4xl font-bold mb-8 text-center'>{category}</h1>
        {/* Check if there are verses available before accessing categoryDesc */}
        {categoryVerses.length > 0 && (
          <p className='mb-8 text-center'>{categoryVerses[0].categoryDesc}</p>
        )}
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
