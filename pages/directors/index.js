import Link from 'next/link';
import useSWR from 'swr';
const fetcher = (url) => fetch(url).then((res) => res.json());

const DirectorsPage = () => {
  const { data, error } = useSWR('/api/directors', fetcher);

  if (error) return <div className="text-center text-red-500 mt-10">Failed to load directors.</div>;
  if (!data) return <div className="text-center mt-10">Loading...</div>;

  return (
    <>
      <main className="container flex-grow mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">Directors</h1>
        {data.map((director) => (
          <div key={director._id} className="mb-10 p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold ">{director.name}</h2>
            <p className="mb-2">{director.biography}</p>



          <Link
            href={`/directors/${director.dId}`}
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            View Details
          </Link>

          </div>
          
        ))}
      </main>
    </>
  );
};

export default DirectorsPage;
