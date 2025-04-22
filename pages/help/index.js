const HelpPage = () => {
  return (
    <div>
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mt-8">Welcome to the Help Center</h1>
        <p className="text-center mt-4 text-lg">Here you can find all the information you need about Movie House.</p>

        <div className="mt-8 text-center">
          <p className="text-xl font-semibold">Select a section to get more information:</p>
          <ul className="mt-4 space-y-2">
            <li><a href="/help/faqs" className="text-blue-500 hover:underline">FAQs</a></li>
            <li><a href="/help/contact" className="text-blue-500 hover:underline">Contact Us</a></li>
            <li><a href="/help/privacy" className="text-blue-500 hover:underline">Privacy Policy</a></li>
            <li><a href="/help/terms" className="text-blue-500 hover:underline">Terms and Conditions</a></li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default HelpPage;
