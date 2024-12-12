import Link from 'next/link'

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              My Blog
            </Link>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-gray-900">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-900">
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

