import { useEffect, useState } from "react";

export default function Agenda() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/agenda`)
      .then(res => res.json())
      .then(setEventos);
  }, []);

  return (
    <div className="flex flex-col items-center mt-32 mb-10 px-4">
      <h1
        className="text-4xl md:text-5xl font-bold text-[#7F42CE] mb-8 drop-shadow-md text-center"
        style={{
          fontFamily: '"Baloo Bhai 2", sans-serif',
          textShadow: '1px 1px 2px black',
        }}
      >
        Agenda
      </h1>
      <div className="flex flex-wrap justify-center gap-8 w-full max-w-5xl">
        {eventos.map((evento, idx) => (
          <div
            key={evento._id || idx}
            className="flex flex-col items-center w-72 bg-white rounded-2xl shadow p-4"
          >
            {evento.meses && (
              <div
                className="text-sky-400 text-xl md:text-2xl font-bold mb-2 text-center"
                style={{
                  fontFamily: '"Baloo Bhai 2", sans-serif',
                  letterSpacing: 1,
                  textShadow: '1px 1px 2px #fff',
                }}
              >
                {evento.meses}
              </div>
            )}
            {evento.imagem && (
              <img
                src={evento.imagem}
                alt={evento.nome}
                className="rounded-2xl w-full h-40 object-cover mb-2 shadow-md"
              />
            )}
            <div
              className="text-sky-400 text-2xl font-bold mt-2 text-center"
              style={{ fontFamily: '"Baloo Bhai 2", sans-serif' }}
            >
              {evento.nome}
            </div>
            {evento.local && (
              <div
                className="text-[#F9C348] text-lg font-bold mb-1 text-center"
                style={{ letterSpacing: 1 }}
              >
                {evento.local}
              </div>
            )}
            <div className="text-gray-500 text-base font-semibold text-center">
              {evento.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}