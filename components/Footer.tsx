const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center h-16 bg-gray-900 text-gray-200 text-sm gap-1">
      <span>&copy; {new Date().getFullYear()} Splitter. All rights reserved.</span>
    </footer>
  )
}

export default Footer
