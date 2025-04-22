const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white mt-10">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-sm">&copy; 2025 Movie House. All rights reserved.</p>
          <div className="flex space-x-4 text-sm">
            <a href="/help/faqs" className="hover:text-blue-400 transition">FAQs</a>
            <a href="/help/contact" className="hover:text-blue-400 transition">Contact</a>
            <a href="/help/terms" className="hover:text-blue-400 transition">Terms</a>
            <a href="/help/privacy" className="hover:text-blue-400 transition">Privacy</a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  