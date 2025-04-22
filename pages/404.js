import { useRouter } from 'next/router';

const Custom404 = () => {
  const router = useRouter();
  const goHome = () => {
    router.push('/');
  };

  return (
    <div>
      <main className="container mx-auto p-4 text-center">
        <h1 className="text-4xl font-bold text-red-600 mt-8">Oops! Page Not Found</h1>
        <p className="text-lg mt-4">
          Sorry, the page you're looking for doesn't exist. But don't worry, we'll get you back on track!
        </p>
        <div className="mt-6">
          <button
            onClick={goHome}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Go Home
          </button>
        </div>
      </main>
    </div>
  );
};

export default Custom404;
