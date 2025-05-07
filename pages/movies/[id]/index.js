import Link from 'next/link';


const MovieDetails = ({ movie, director, genre }) => {
  if (!movie) {
    return <div className="text-center text-red-500 mt-10">Movie not found.</div>;
  }

  return (
    <>
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
        <p className="mb-2">{movie.description}</p>
        <p className="">Released: {movie.releaseYear}</p>
        <p className="">Rating: {movie.rating}</p>
        <p className="">Genre: {genre?.name || 'Unknown'}</p>
        <p className="">Director: {director?.name || 'Unknown'}</p>

        <Link
          href={`/movies/${movie._id}/director`}
          className="inline-block mt-4 text-blue-600 hover:underline"
        >
          View Director Info →
        </Link>
      </main>
    </>
  );
};

// export async function getStaticPaths() {
//   const filePath = path.join(process.cwd(), 'public/data/data.json');
//   const jsonData = fs.readFileSync(filePath, 'utf-8');
//   const data = JSON.parse(jsonData);

//   const paths = data.movies.map((movie) => ({
//     params: { id: movie.id },
//   }));

//   return {
//     paths,
//     fallback: 'blocking', // ISR
//   };
// }

// export async function getStaticProps({ params }) {
//   const filePath = path.join(process.cwd(), 'public/data/data.json');
//   const jsonData = fs.readFileSync(filePath, 'utf-8');
//   const data = JSON.parse(jsonData);

//   const movie = data.movies.find((m) => m.id === params.id);
//   if (!movie) return { notFound: true };

//   const director = data.directors.find((d) => d.id === movie.directorId);
//   const genre = data.genres.find((g) => g.id === movie.genreId);

//   return {
//     props: {
//       movie,
//       director: director || null,
//       genre: genre || null,
//     },
//     revalidate: 10,
//   };
// }

export async function getStaticPaths() {
  try {
    const res = await fetch('http://localhost:3000/api/movies');
    const movies = await res.json();

    const paths = movies.map((movie) => ({
      params: { id: movie._id.toString() },
    }));

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('Error generating paths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
}

export async function getStaticProps({ params }) {
  try {
    const movieRes = await fetch(`http://localhost:3000/api/movies/${params.id}`);
    if (!movieRes.ok) return { notFound: true };
    const movie = await movieRes.json();

    const [genreRes, directorRes] = await Promise.all([
      fetch(`http://localhost:3000/api/genres/${movie.genreId}`),
      fetch(`http://localhost:3000/api/directors/${movie.directorId}`),
    ]);

    const genre = genreRes.ok ? await genreRes.json() : null;
    const director = directorRes.ok ? await directorRes.json() : null;

    return {
      props: {
        movie,
        genre,
        director,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error('Error fetching movie detail:', error);
    return { notFound: true };
  }
}


export default MovieDetails;
