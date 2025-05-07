import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import { useEffect } from 'react';

 
export default function GenreList({ genres }) {
  return (
    <>
      <main className="container mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-center mb-12">Browse Genres</h1>

        <div className="space-y-6 max-w-3xl mx-auto">
          {genres.map((genre) => (
            <Link key={genre._id} href={`/genres/${genre.genreId}`}>
              <div className="rounded-xl p-6 flex items-center justify-between shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer mt-2">
                <h2 className="text-xl font-semibold">{genre.name}</h2>
                <span className=" flex items-center gap-1 text-sm font-medium text-blue-500 hover:text-blue-600 transition duration-300">View <FaArrowRight/></span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch('http://localhost:3000/api/genres'); 
    const genres = await res.json();
    return {
      props: {
        genres,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching genres from API:', error);
    return {
      props: {
        genres: [],
      },
    };
  }
}
