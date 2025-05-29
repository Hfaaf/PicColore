import { useState } from "react";

export default function CatalogoForm({ token, setCatalogo }) {
    const [catalogoNome, setCatalogoNome] = useState("");
    const [catalogoImagem, setCatalogoImagem] = useState(null);
    const [catalogoDescricao, setCatalogoDescricao] = useState("");

    async function adicionarCatalogo(e) {
        e.preventDefault();
        if (!catalogoNome.trim() || !catalogoDescricao.trim()) {
            alert("Por favor preencha nome e descrição.");
            return;
        }
        const formData = new FormData();
        formData.append("nome", catalogoNome);
        formData.append("descricao", catalogoDescricao);
        if (catalogoImagem) formData.append("imagem", catalogoImagem);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/catalogo`, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + token,
                },
                body: formData,
            });
            if (res.ok) {
                setCatalogoNome("");
                setCatalogoImagem(null);
                setCatalogoDescricao("");
                const data = await fetch(`${import.meta.env.VITE_API_URL}/catalogo`);
                const json = await data.json();
                setCatalogo(json);
            } else {
                const errorData = await res.json();
                console.error("Erro ao adicionar catálogo:", errorData);
                alert("Erro ao adicionar catálogo: " + (errorData.message || "Erro desconhecido"));
            }
        } catch (error) {
            console.error("Erro ao adicionar catálogo:", error);
            alert("Erro ao adicionar catálogo: " + error.message);
        }
    }

    return (
        <form
            onSubmit={adicionarCatalogo}
            className="flex flex-col gap-3 bg-[#F9C348] rounded-xl p-4 mb-8 shadow"
        >
            <h4 className="text-lg font-semibold text-[#7F42CE] mb-2">
                Adicionar novo item ao catálogo
            </h4>
            <input
                required
                value={catalogoNome}
                onChange={(e) => setCatalogoNome(e.target.value)}
                placeholder="Nome do Evento"
                className="rounded px-3 py-2"
            />
            <textarea
                required
                value={catalogoDescricao}
                onChange={(e) => setCatalogoDescricao(e.target.value)}
                placeholder="Descrição"
                className="rounded px-3 py-2 h-20 resize-none"
            />
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setCatalogoImagem(e.target.files[0])}
                className="rounded px-3 py-2"
            />
            <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white rounded py-2 font-bold mt-2 transition"
            >
                Adicionar ao Catálogo
            </button>
        </form>
    );
}