import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="bg-gray-100">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="flex items-center">
          <Image src="/img/Logo.png" alt="Coopesoft Logo" width={50} height={50} />
          <span className="ml-2 text-xl font-bold text-[#00755D]">Coopesoft</span>
        </div>
        <nav className="flex items-center">
          <span className="text-gray-500 mr-4">Para ordenar tu cooperativa</span>
          <Link href="/login">
            <button className="bg-[#00755D] text-white px-4 py-2 rounded-md hover:bg-[#005844]">
              Iniciar Sesión
            </button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center h-[70vh] bg-gray-200">
        <Image
          src="/img/ahorro.png"
          alt="Hero ahorro"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        <div className="absolute z-10 text-left">
          <h1 className="text-4xl font-bold text-[#00755D]">
            Una Gran Cooperativa para todos los Dominicanos
          </h1>
        </div>
      </section>

      {/* Cards Section */}
      <section className="py-8 px-4 grid gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-5xl mx-auto">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <Image src="/img/money.png" alt="Ahorros seguros" width={300} height={200} />
          <div className="p-4">
            <h2 className="text-xl font-bold text-[#00755D]">
              Ahorros seguros para que siempre tengas tu cerruco
            </h2>
            <p className="text-gray-600 mt-2">
              Suspendisse potenti. Sed neque augue, mattis in posuere quis, sagittis...
            </p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <Image src="/img/bussines.png" alt="Préstamos sin crédito" width={300} height={200} />
          <div className="p-4">
            <h2 className="text-xl font-bold text-[#00755D]">
              Préstamos con tasas de bancos sin mirar crédito
            </h2>
            <p className="text-gray-600 mt-2">
              Nunc mi tortor, venenatis fermentum ipsum id, gravida lacinia carta...
            </p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <Image src="/img/party.png" alt="Eventos familiares" width={300} height={200} />
          <div className="p-4">
            <h2 className="text-xl font-bold text-[#00755D]">
              Eventos para los Socios de la familia para ganar premios
            </h2>
            <p className="text-gray-600 mt-2">
              Praesent lobortis, lorem id elementum vehicula, sapien ipsum tincidunt...
            </p>
          </div>
        </div>
      </section>

      {/* Loan Calculator */}
      <section className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto mt-8">
        <h2 className="text-2xl font-bold text-center text-[#00755D] mb-6">
          Calculadora Préstamos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Monto a Solicitar"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          <input
            type="text"
            placeholder="Tiempo del préstamo"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          <input
            type="text"
            placeholder="Tasa de Interés"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          <input
            type="text"
            placeholder="Ingresos mensuales"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <button className="mt-4 bg-[#00755D] text-white px-6 py-2 rounded-md hover:bg-[#005844] block mx-auto">
          Calcular
        </button>
        <p className="text-center text-gray-700 mt-4">Tu pago mensual sería de: <strong>$0.00</strong></p>
      </section>
    </div>
  );
}
