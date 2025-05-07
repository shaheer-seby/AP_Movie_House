'use client';
import MovieCard from '@/components/MovieCard';
import { useRouter } from 'next/router';

const Home = ({movies}) => {
  const router = useRouter();
  return (
    <>
      <main className="container mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Welcome to Movie House 🎬</h1>
          <p className="text-gray-600 mb-6">Discover trending movies, genres, and directors!</p>
          <button
            onClick={() => router.push('/genres')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition font-medium"
          >
            Browse Genres
          </button>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Trending Movies</h2>

          <div className="flex flex-wrap justify-center gap-6">
            {movies.slice(0, 3)?.map((movie) => (
              <MovieCard key={movie?.id} movie={movie} />
            ))}
          </div>
      </main>
    </>
  );
};

export default Home;

// export async function getStaticProps() {
//   try {
//     const res = await fetch(`http://localhost:3000/data/data.json`);
//     const data = await res.json();
//     console.log(data); 

//     if (!data || !data.movies) {
//       console.log('Movies data not found');
//       return {
//         notFound: true,
//       };
//     }

//     return {
//       props: { movies: data.movies },
//       revalidate: 10,
//     };
//   } catch (error) {
//     console.error('Error fetching movies:', error);
//     return {
//       notFound: true,
//     };
//   }
// }


export async function getStaticProps() {
  try {
    const res = await fetch('http://localhost:3000/api/movies');
    const movies = await res.json();

    if (!movies || !Array.isArray(movies)) {
      return { notFound: true };
    }

    return {
      props: { movies },
      revalidate: 10,
    };
  } catch (error) {
    console.error('Error fetching movies:', error);
    return {
      notFound: true,
    };
  }
}
