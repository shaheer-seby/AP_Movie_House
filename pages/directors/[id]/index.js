import { useRouter } from 'next/router';

const DirectorDetails = ({ director }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!director) {
    return <div className="text-red-500 text-center mt-10">Director not found.</div>;
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{director.name}</h1>
      <p className="text-gray-600 mb-4">{director.biography}</p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">Movies Directed:</h2>
      <ul className="space-y-2">
        {director.moviesDirected.map((movie) => (
          <li key={movie._id} className="border p-4 rounded-md shadow-sm">
            <p className="text-lg font-medium">{movie.title}</p>
            <p className="text-gray-600">{movie.description}</p>
            <p className="text-sm text-gray-500">Released: {movie.releaseYear} | Rating: {movie.rating}</p>
          </li>
        ))}
      </ul>
    </main>
  );
};

export async function getStaticPaths() {
  // fallback route only for demo/testing purposes
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  try {
    const res = await fetch(`http://localhost:3000/api/directors/${params.id}`);
    if (!res.ok) return { notFound: true };

    const director = await res.json();

    return {
      props: { director },
      revalidate: 10,
    };
  } catch (error) {
    console.error('Error fetching director data:', error);
    return { notFound: true };
  }
}

export default DirectorDetails;
