import fs from 'fs';
import path from 'path';
import MovieCard from '@/components/MovieCard';

export default function GenreMovies({ genre, movies }) {
  return (
    <>
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
          {genre?.name ? `${genre.name} Movies` : 'Genre Not Found'}
        </h1>

        <div className="flex flex-wrap justify-center gap-6">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <p className="text-gray-500">No movies found for this genre.</p>
          )}
        </div>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'public/data/data.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  const paths = data.genres.map((genre) => ({
    params: { id: genre.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'public/data/data.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  const genre = data.genres.find((g) => g.id === params.id);
  const movies = genre
    ? data.movies.filter((movie) => movie.genreId === genre.id)
    : [];

  return {
    props: {
      genre: genre || null,
      movies,
    },
  };
}
