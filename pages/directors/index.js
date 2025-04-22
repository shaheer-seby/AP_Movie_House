import useSWR from 'swr';
const fetcher = (url) => fetch(url).then((res) => res.json());

const DirectorsPage = () => {
  const { data, error } = useSWR('/api/directors', fetcher);

  if (error) return <div className="text-center text-red-500 mt-10">Failed to load directors.</div>;
  if (!data) return <div className="text-center mt-10">Loading...</div>;

  return (
    <>
      <main className="container flex-grow mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Directors</h1>
        {data.map((director) => (
          <div key={director.id} className="mb-10 p-6 bg-white shadow rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800">{director.name}</h2>
            <p className="text-gray-600 mb-2">{director.biography}</p>

            <h3 className="text-lg font-medium text-gray-700 mb-1">Movies Directed:</h3>
            <ul className="list-disc list-inside text-gray-700">
            {Array.isArray(director.movies) && director.movies.length > 0 ? (
                director.movies.map((movie) => (
                <li key={movie.id}>
                    {movie.title} ({movie.releaseYear})
                </li>
                ))
            ) : (
                <li>No movies found</li>
            )}
            </ul>
          </div>
        ))}
      </main>
    </>
  );
};

export default DirectorsPage;
