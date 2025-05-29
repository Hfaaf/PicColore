import { useEffect, useState } from "react";

export default function Catalogo() {
    const [catalogo, setCatalogo] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/catalogo`)
            .then(res => res.json())
            .then(setCatalogo)
            .catch(error => console.error("Erro ao carregar catálogo:", error));
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
                Catalogo de Eventos
            </h1>
            <div className="flex flex-wrap justify-center gap-8 w-full max-w-5xl">
                {catalogo.map((evento, idx) => (
                    <div
                        key={evento._id || idx}
                        className="flex flex-col items-center w-72 bg-white rounded-2xl shadow p-4"
                    >
                        {evento.imagem && (
                            <img
                                src={`${import.meta.env.VITE_API_URL.replace('/api', '')}${evento.imagem}`}
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
                        {evento.descricao && (
                            <div
                                className="text-gray-700 text-sm mb-2 text-center"
                                style={{ fontFamily: '"Baloo Bhai 2", sans-serif' }}
                            >
                                {evento.descricao}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

