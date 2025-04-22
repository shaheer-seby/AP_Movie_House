import fs from 'fs';
import path from 'path';
import Link from 'next/link';

const DirectorPage = ({ director, movie }) => {
  if (!director || !movie) {
    return (
      <div className="text-center text-red-500 mt-10">
        Director information not found.
      </div>
    );
  }

  return (
    <>
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-2">{director.name}</h1>
        <p className="text-gray-600 mb-4">{director.biography}</p>

        <p className="text-gray-500">Movie: <span className="font-semibold">{movie.title}</span></p>

        <Link
          href={`/movies/${movie.id}`}
          className="inline-block mt-4 text-blue-600 hover:underline"
        >
          ← Back to Movie Details
        </Link>
      </main>
    </>
  );
};

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'public/data/data.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  const paths = data.movies.map((movie) => ({
    params: { id: movie.id },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'public/data/data.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  const movie = data.movies.find((m) => m.id === params.id);
  if (!movie) {
    return { notFound: true };
  }

  const director = data.directors.find((d) => d.id === movie.directorId);

  return {
    props: {
      movie,
      director: director || null,
    },
    revalidate: 10,
  };
}

export default DirectorPage;
