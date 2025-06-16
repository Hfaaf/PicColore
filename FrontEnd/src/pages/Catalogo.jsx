import { useEffect, useState } from "react";

export default function Catalogo() {
    const [catalogo, setCatalogo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        carregarCatalogo();
    }, []);

    async function carregarCatalogo() {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/catalogo`);
            if (!res.ok) {
                throw new Error("Erro ao carregar catálogo");
            }
            const data = await res.json();
            const sortedCatalogo = data.sort((a, b) => a.order - b.order);
            setCatalogo(sortedCatalogo);
        } catch (error) {
            console.error("Erro ao carregar catálogo:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>Erro: {error}</div>;
    }

    return (
        <div className="flex flex-col items-center mt-32 mb-10 px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-[#7F42CE] mb-8 drop-shadow-md text-center">
                Catalogo de Eventos
            </h1>
            <div className="flex flex-wrap justify-center gap-8 w-full max-w-5xl">
                {catalogo.map((evento) => (
                    <div
                        key={evento._id} // Use apenas _id como chave
                        className="flex flex-col items-center w-72 bg-white rounded-2xl shadow p-4"
                    >
                        {evento.imagem && (
                            <img
  src={evento.imagem}
  alt={evento.nome}
  className="rounded-2xl w-full h-40 object-cover mb-2 shadow-md"
/>
                        )}
                        <div className="text-sky-400 text-2xl font-bold mt-2 text-center">
                            {evento.nome}
                        </div>
                        {evento.descricao && (
                            <div className="text-gray-700 text-sm mb-2 text-center">
                                {evento.descricao}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
