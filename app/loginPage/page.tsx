"use client";

import { FaEnvelope, FaLock } from "react-icons/fa";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      
      {/* Login and Register Forms */}
      <main className="flex flex-col lg:flex-row justify-center items-center gap-10 mt-12">
        {/* Login Form */}
        <div className="bg-white shadow-md rounded-lg p-8 w-[350px]">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Iniciar Sesión</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 font-medium mb-2">
                Correo
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  placeholder="email@address.com"
                  className="w-full border rounded-md pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-[#00755D]"
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-600 font-medium mb-2">
                Contraseña
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  placeholder="********"
                  className="w-full border rounded-md pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-[#00755D]"
                />
              </div>
            </div>
            <Link href="/" >
              <button
                type="submit"
                className="w-full bg-[#00755D] text-white py-2 rounded-md font-medium hover:bg-[#005844] transition-colors"
              >
                Iniciar sesión
              </button>
            </Link>
          </form>
        </div>

        {/* Register Form */}
        <div className="bg-white shadow-md rounded-lg p-8 w-[350px]">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Crear cuenta</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="emailRegister" className="block text-gray-600 font-medium mb-2">
                Correo
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  id="emailRegister"
                  placeholder="email@address.com"
                  className="w-full border rounded-md pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-[#00755D]"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="passwordRegister" className="block text-gray-600 font-medium mb-2">
                Contraseña
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  id="passwordRegister"
                  placeholder="********"
                  className="w-full border rounded-md pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-[#00755D]"
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-gray-600 font-medium mb-2">
                Confirmar contraseña
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="********"
                  className="w-full border rounded-md pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-[#00755D]"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#00755D] text-white py-2 rounded-md font-medium hover:bg-[#005844] transition-colors"
            >
              Crear cuenta
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
