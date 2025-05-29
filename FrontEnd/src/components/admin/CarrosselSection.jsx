import { useState, useEffect } from "react";

export default function CarrosselSection({ token }) {
    const [carrouselImages, setCarrouselImages] = useState([]);
    const [carrouselMsg, setCarrouselMsg] = useState("");
    const [carrouselFile, setCarrouselFile] = useState(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/carrousel`)
            .then((res) => res.json())
            .then(setCarrouselImages);
    }, []);

    async function uploadCarrouselImage(e) {
        e.preventDefault();
        setCarrouselMsg("");
        if (!carrouselFile) {
            setCarrouselMsg("Selecione uma imagem!");
            return;
        }
        const formData = new FormData();
        formData.append("image", carrouselFile);
        const res = await fetch(`${import.meta.env.VITE_API_URL}/carrousel`, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
            },
            body: formData,
        });
        if (res.ok) {
            setCarrouselMsg("Imagem enviada!");
            setCarrouselFile(null);
            fetch(`${import.meta.env.VITE_API_URL}/carrousel`)
                .then((res) => res.json())
                .then(setCarrouselImages);
        } else {
            setCarrouselMsg("Erro ao enviar imagem");
        }
    }

    async function deletarImagem(id) {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/carrousel/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        if (res.ok) {
            setCarrouselImages(carrouselImages.filter((img) => img._id !== id));
        }
    }

    return (
        <>
            <h3 className="text-xl font-bold mb-4 text-[#F95D08]">Imagens do Carrossel</h3>
            <form
                onSubmit={uploadCarrouselImage}
                className="flex flex-col md:flex-row gap-2 items-center mb-4"
            >
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCarrouselFile(e.target.files[0])}
                    className="rounded px-2 py-1 border"
                />
                <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white rounded px-4 py-2 font-bold transition"
                >
                    Enviar
                </button>
                {carrouselMsg && <span className="ml-2 text-red-500">{carrouselMsg}</span>}
            </form>
            <div className="flex flex-wrap gap-4">
                {carrouselImages.map((img) => (
                    <div key={img._id} className="relative">
                        <img
                            src={`${import.meta.env.VITE_API_URL.replace("/api", "")}${img.url}`}
                            alt="Carrossel"
                            className="w-32 h-20 object-cover rounded border"
                        />
                        <button
                            onClick={() => deletarImagem(img._id)}
                            className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded px-2 py-1 text-xs transition"
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}