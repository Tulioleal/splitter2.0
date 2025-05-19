const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center h-16 bg-gray-900 text-gray-200 text-sm gap-1">
      <span>
        &copy; {new Date().getFullYear()} Splitter. All rights reserved.
      </span>
      <div className="flex gap-4">
        <a href="#" className="hover:text-white transition-colors">Privacy</a>
        <a href="#" className="hover:text-white transition-colors">Terms</a>
        <a href="#" className="hover:text-white transition-colors">Contact</a>
        <a href="#" className="hover:text-white transition-colors">GitHub</a>
      </div>
    </footer>
  );
};

export default Footer;