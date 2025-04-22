import { useRouter } from 'next/router';

const HelpPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const section = slug ? slug[0] : ''; 
  
  const goBack = () => {
    router.push('/help');
  };

  return (
    <div>
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mt-8">{section.charAt(0).toUpperCase() + section.slice(1)}</h1>
        <div className="mt-6">
          {section === 'faqs' && (
            <div>
              <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
              <p>Here are some common questions and answers.</p>
            </div>
          )}
          {section === 'contact' && (
            <div>
              <h2 className="text-2xl font-semibold">Contact Us</h2>
              <p>If you have any questions, feel free to reach out to us.</p>
            </div>
          )}
          {section === 'privacy' && (
            <div>
              <h2 className="text-2xl font-semibold">Privacy Policy</h2>
              <p>Your privacy is important to us. Read about our policies here.</p>
            </div>
          )}
          {section === 'terms' && (
            <div>
              <h2 className="text-2xl font-semibold">Terms and Conditions</h2>
              <p>Read our terms and conditions for using Movie House.</p>
            </div>
          )}
          {section !== 'faqs' && section !== 'contact' && section !== 'privacy' && section !== 'terms' && (
            <div>
              <h2 className="text-2xl font-semibold">404 - Not Found</h2>
              <p>This section does not exist.</p>
            </div>
          )}
        </div>

        {/* Go Back Button */}
        <div className="mt-6 text-center">
          <button
            onClick={goBack}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Go Back to Help
          </button>
        </div>
      </main>
    </div>
  );
};

export default HelpPage;
