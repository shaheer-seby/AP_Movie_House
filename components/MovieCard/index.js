import Link from 'next/link';
import { FaStar } from 'react-icons/fa';

const MovieCard = ({ movie }) => {
  return (
    <div className=" rounded-2xl shadow-md p-6 w-full sm:w-[300px] flex flex-col justify-between hover:shadow-xl transition duration-300 border border-gray-100">
      <div>
        <h3 className="text-2xl font-bold mb-2">{movie.title}</h3>

        <p className="text-sm mb-4">
          {movie.description.length > 100
            ? `${movie.description.slice(0, 100)}...`
            : movie.description}
        </p>

        <div className="flex items-center gap-2 text-yellow-500 mb-4">
          <FaStar size={16} />
          <span className="text-sm font-medium ">{movie.rating}</span>
        </div>
      </div>

      <Link
        href={`/movies/${movie._id}`}
        className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        View Details
      </Link>
    </div>
  );
};

export default MovieCard;
