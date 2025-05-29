export default function CatalogoEditForm({
    catalogoEditFields,
    setCatalogoEditFields,
    editarCatalogo,
    cancelCatalogoEdit,
}) {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                editarCatalogo();
            }}
            className="flex flex-col gap-3 bg-[#D3C5F5] rounded-xl p-4 shadow mt-6"
        >
            <h4 className="text-lg font-semibold text-[#5A3D9A] mb-2">
                Editar item do catálogo
            </h4>
            <input
                required
                value={catalogoEditFields.nome}
                onChange={(e) =>
                    setCatalogoEditFields((f) => ({ ...f, nome: e.target.value }))
                }
                placeholder="Nome do Evento"
                className="rounded px-3 py-2"
            />
            <textarea
                required
                value={catalogoEditFields.descricao}
                onChange={(e) =>
                    setCatalogoEditFields((f) => ({ ...f, descricao: e.target.value }))
                }
                placeholder="Descrição"
                className="rounded px-3 py-2 h-20 resize-none"
            />
            <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                    setCatalogoEditFields((f) => ({ ...f, imagem: e.target.files[0] }))
                }
                className="rounded px-3 py-2"
            />
            <div className="flex gap-2">
                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white rounded py-2 font-bold mt-2 transition"
                >
                    Salvar
                </button>
                <button
                    type="button"
                    onClick={cancelCatalogoEdit}
                    className="bg-gray-400 hover:bg-gray-500 text-white rounded py-2 font-bold mt-2 transition"
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
}