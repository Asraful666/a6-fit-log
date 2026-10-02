import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center text-white">
      <p className="mb-4 text-7xl font-bold text-[#ccff00]">404</p>

      <h1 className="mb-3 text-3xl font-bold">
        PAGE NOT FOUND
      </h1>

      <p className="mb-8 max-w-md text-gray-400">
        The workout or page you are looking for does not exist.
      </p>

      <Link
        href="/"
        className="rounded-full bg-[#ccff00] px-6 py-3 font-bold text-black transition hover:scale-105"
      >
        BACK TO HOME
      </Link>
    </main>
  );
}