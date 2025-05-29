import { useEffect, useState } from "react";
import EventosSection from "../components/admin/EventosSection";
import CarrosselSection from "../components/admin/CarrosselSection";
import CatalogoSection from "../components/admin/CatalogoSection";

export default function AdminPanel() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (!token) {
      window.location.href = "/adm";
    }
  }, [token]);

  if (!token) return null;

  return (
    <div className="flex justify-center mt-36 mb-16 px-2">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 md:p-10 border border-gray-200">
        <h2
          className="text-3xl font-bold mb-6 text-center text-[#7F42CE]"
          style={{ fontFamily: '"Baloo Bhai 2", sans-serif' }}
        >
          Painel Administrativo
        </h2>

        <EventosSection token={token} />
        <CarrosselSection token={token} />
        <CatalogoSection token={token} />
      </div>
    </div>
  );
}