import { useState, useEffect } from "react";
import CatalogoForm from "./CatalogoForm";
import CatalogoEditForm from "./CatalogoEditForm";

export default function CatalogoSection({ token }) {
    const [catalogo, setCatalogo] = useState([]);
    const [catalogoEditId, setCatalogoEditId] = useState(null);
    const [catalogoEditFields, setCatalogoEditFields] = useState({
        nome: "",
        descricao: "",
        imagem: null,
    });

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/catalogo`)
            .then((res) => res.json())
            .then(setCatalogo);
    }, []);

    async function deletarCatalogo(id) {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/catalogo/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        if (res.ok) {
            setCatalogo(catalogo.filter((item) => item._id !== id));
        } else {
            console.error("Erro ao deletar catálogo");
        }
    }

    function startCatalogoEdit(item) {
        setCatalogoEditId(item._id);
        setCatalogoEditFields({
            nome: item.nome,
            descricao: item.descricao,
            imagem: null,
        });
    }

    function cancelCatalogoEdit() {
        setCatalogoEditId(null);
        setCatalogoEditFields({ nome: "", descricao: "", imagem: null });
    }

    async function editarCatalogo() {
        if (!catalogoEditId) return;
        const formData = new FormData();
        formData.append("nome", catalogoEditFields.nome);
        formData.append("descricao", catalogoEditFields.descricao);
        if (catalogoEditFields.imagem) formData.append("imagem", catalogoEditFields.imagem);
        const res = await fetch(`${import.meta.env.VITE_API_URL}/catalogo/${catalogoEditId}`, {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + token,
            },
            body: formData,
        });
        if (res.ok) {
            setCatalogoEditId(null);
            setCatalogoEditFields({ nome: "", descricao: "", imagem: null });
            fetch(`${import.meta.env.VITE_API_URL}/catalogo`)
                .then((res) => res.json())
                .then(setCatalogo);
        } else {
            console.error("Erro ao editar catálogo");
        }
    }

    return (
        <>
            <h3 className="text-xl font-bold mb-4 text-[#F95D08] mt-8">Catálogo de Eventos</h3>
            <CatalogoForm token={token} setCatalogo={setCatalogo} />

            {catalogo.length > 0 && (
                <div className="mt-4">
                    <h4 className="text-lg font-semibold text-[#7F42CE] mb-2">Itens no Catálogo</h4>
                    <ul className="space-y-2">
                        {catalogo.map((item) => (
                            <li
                                key={item._id}
                                className="flex items-center justify-between bg-white rounded-lg p-3 shadow"
                            >
                                <div>
                                    <strong>{item.nome}</strong>
                                    <p className="text-sm text-gray-600">{item.descricao}</p>
                                </div>
                                {item.imagem && (
                                    <img
                                        src={`${import.meta.env.VITE_API_URL.replace("/api", "")}${item.imagem}`}
                                        alt={item.nome}
                                        className="w-32 h-20 object-cover rounded my-2 border"
                                    />
                                )}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => startCatalogoEdit(item)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white rounded px-2 py-1 text-xs transition"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => deletarCatalogo(item._id)}
                                        className="bg-red-600 hover:bg-red-700 text-white rounded px-2 py-1 text-xs transition"
                                    >
                                        Remover
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {catalogoEditId && (
                <CatalogoEditForm
                    catalogoEditFields={catalogoEditFields}
                    setCatalogoEditFields={setCatalogoEditFields}
                    editarCatalogo={editarCatalogo}
                    cancelCatalogoEdit={cancelCatalogoEdit}
                />
            )}
        </>
    );
}