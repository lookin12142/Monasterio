import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function Navbar() {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <nav className="flex justify-between items-center bg-gray-900 text-white px-10 py-4 shadow-lg">
      <h1 className="text-2xl font-bold tracking-wide text-red-500">
        Monasterio
      </h1>

      <ul className="flex items-center gap-6">
        {!session?.user ? (
          <>
            <li>
              <Link
                href="/"
                className="hover:text-red-500 transition duration-300"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href="/auth/login"
                className="hover:text-red-500 transition duration-300"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/auth/register"
                className="hover:text-red-500 transition duration-300"
              >
                Register
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                href="/dashboard"
                className="hover:text-red-500 transition duration-300"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/api/auth/signout"
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition duration-300"
              >
                Logout
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
