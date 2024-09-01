import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h2 className="text-4xl font-bold mb-4">Página No Encontrada</h2>
      <p className="text-gray-600 mb-6">No pudimos encontrar el recurso solicitado</p>
      <Link href="/">
        <span className="text-blue-500 hover:underline">Volver al Home</span>
      </Link>
    </div>
  );
}

