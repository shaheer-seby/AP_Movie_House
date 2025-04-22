import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

export default function GenreList({ genres }) {
  return (
    <>
      <main className="container mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">Browse Genres</h1>

        <div className="space-y-6 max-w-3xl mx-auto">
          {genres.map((genre) => (
            <Link key={genre.id} href={`/genres/${genre.id}`}>
              <div className="bg-white rounded-xl p-6 flex items-center justify-between shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 ease-in-out hover:bg-blue-50 cursor-pointer">
                <h2 className="text-xl font-semibold text-gray-800">{genre.name}</h2>
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
  const filePath = path.join(process.cwd(), 'public/data/data.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  return {
    props: {
      genres: data.genres,
    },
  };
}
