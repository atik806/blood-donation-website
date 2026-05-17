import Link from "next/link";

export default function Navbar() {
  return (
    <div className="bg-red-600 text-white shadow-md">
      <nav className="max-w-7xl mx-auto flex justify-between items-center p-4">
        
        {/* Logo */}
        <h2 className="text-2xl font-bold">
          <Link href="/" className="hover:text-red-200">
            LifeSaver ❤️
          </Link>
        </h2>

        {/* Menu */}
        <ul className="flex items-center gap-6 text-lg">
          <li>
            <Link href="/" className="hover:text-red-200">
              Home
            </Link>
          </li>
          <li>
            <Link href="/About" className="hover:text-red-200">
              About
            </Link>
          </li>
          <li>
            <Link href="/services" className="hover:text-red-200">
              Services
            </Link>
          </li>
          <li>
            <Link href="/Contact" className="hover:text-red-200">
              Contact
            </Link>
          </li>

          {/* Login Button */}
          <li>
            <Link
              href="/Login"
              className="bg-white text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-100 transition"
            >
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}