import Link from 'next/link'

const Nav = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <Link href="/" className="text-lg font-bold">
        Splitter/
      </Link>
    </nav>
  )
}

export default Nav
