
import { useRouter } from 'next/router';
import MovieCard from '@/components/MovieCard';
import { useEffect } from 'react';

const Movies = ({ genres, movies }) => {
  const router = useRouter();
  
  const handleGenreChange = (event) => {
    const selectedGenre = event.target.value;
    if (selectedGenre == "all") {
      router.push("/movies");
    }
    else {
    router.push(`/movies?genre=${selectedGenre}`);
    }
  };
  return (
    <>
      <main className="container mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Browse by Genre</h1>
          <select
            onChange={handleGenreChange}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg transition font-medium"
          >
            <option key={"all"} value={"all"}>All</option>
            {genres.map((genre) => (
              <option key={genre.genreId} value={genre.genreId}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <h2 className="text-2xl font-semibold mb-6">Movies</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {movies.length === 0 ? (
            <p className="text-center ">No movies found for this genre.</p>
          ) : (
            movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))
          )}
        </div>
      </main>
    </>
  );
};




export async function getServerSideProps({ query, req }) {
  const genreQuery = query.genre || '';

  const baseUrl = `http://${req.headers.host}`; 

  try {
    
    const genresRes = await fetch(`${baseUrl}/api/genres`);
    const genres = await genresRes.json();


    const moviesRes = genreQuery
      ? await fetch(`${baseUrl}/api/genres/${genreQuery}/movies`)
      : await fetch(`${baseUrl}/api/movies`);

    const movies = await moviesRes.json();

    

    return {
      props: {
        movies,
        genres,
      },
    };
  } catch (error) {
    console.error('API fetch error:', error);
    return {
      props: {
        movies: [],
        genres: [],
      },
    };
  }
}

export default Movies;
