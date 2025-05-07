import MovieCard from '@/components/MovieCard';

export default function GenreMovies({ genre, movies }) {
  console.log("🚀 ~ GenreMovies ~ movies:", movies)
  return (
    <>
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
          {genre?.name ? `${genre.name} Movies` : 'Genre Not Found'}
        </h1>

        <div className="flex flex-wrap justify-center gap-6">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
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
  try {
    const res = await fetch('http://localhost:3000/api/genres');
    const genres = await res.json();

    const paths = genres.map((genre) => ({
      params: { id: genre.genreId }, 
    }));

    return {
      paths,
      fallback: false, 
    };
  } catch (error) {
    console.error('Failed to fetch genres:', error);
    return { paths: [], fallback: false };
  }
}

export async function getStaticProps({ params }) {
  const { id } = params;

  try {
    const genreRes = await fetch(`http://localhost:3000/api/genres/${id}`);
    const genre = await genreRes.json();

    const moviesRes = await fetch(`http://localhost:3000/api/genres/${id}/movies`);
    const movies = await moviesRes.json();

    return {
      props: {
        genre,
        movies,
      },
      revalidate: 60, 
    };
  } catch (error) {
    console.error('Error fetching genre or movies:', error);
    return {
      props: {
        genre: null,
        movies: [],
      },
    };
  }
}
