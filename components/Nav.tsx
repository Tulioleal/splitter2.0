import Link from 'next/link'

const Nav = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <Link href="/" className="text-lg font-bold">
        Splitter/
      </Link>
      <ul className="flex space-x-4">
        <li>
          <Link href="/about" className="hover:text-gray-400">
            About
          </Link>
        </li>
        <li>
          <Link href="/contact" className="hover:text-gray-400">
            Contact
          </Link>
        </li>
        {/* <li>
          <Link href="/login" className="hover:text-gray-400">
            Login
          </Link>
        </li>
        <li>
          <Link href="/signup" className="hover:text-gray-400">
            Sign Up
          </Link>
        </li> */}
      </ul>
    </nav>
  )
}

export default Nav
