import fs from 'fs';
import path from 'path';
import { useRouter } from 'next/router';
import MovieCard from '@/components/MovieCard';

const Movies = ({ genres, movies }) => {
  const router = useRouter();
  
  // Handle genre change
  const handleGenreChange = (event) => {
    const selectedGenre = event.target.value;
    router.push(`/movies?genre=${selectedGenre}`);
  };
  return (
    <>
      <main className="container mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Browse by Genre</h1>
          <select
            onChange={handleGenreChange}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg transition font-medium"
          >
            <option value="">Select Genre</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Movies</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {movies.length === 0 ? (
            <p className="text-center text-gray-500">No movies found for this genre.</p>
          ) : (
            movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          )}
        </div>
      </main>
    </>
  );
};

export async function getServerSideProps({ query }) {
  const genreQuery = query.genre || ''; // Get genre from query or empty string

  try {
    const filePath = path.join(process.cwd(), 'public/data/data.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(jsonData);

    // Ensure genres are valid
    const genres = data.genres || [];
    const filteredMovies = data.movies.filter((movie) => {
      // Match movie.genreId with genreQuery or return all movies if no genre is selected
      return movie.genreId === genreQuery || genreQuery === ''; 
    });

    return {
      props: {
        movies: filteredMovies,  // Send filtered movies
        genres: genres,          // Send all genres
      },
    };
  } catch (error) {
    console.error('Error reading or parsing data:', error);
    return {
      props: {
        movies: [],  // Return empty array if there's an error
        genres: [],  // Return empty array if there's an error
      },
    };
  }
}

export default Movies;
