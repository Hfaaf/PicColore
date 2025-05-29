export default function EventoItem({
    ev,
    editId,
    editFields,
    setEditFields,
    deletarEvento,
    startEdit,
    cancelEdit,
    saveEdit,
}) {
    return (
        <li className="mb-4 flex flex-col border-b pb-3 last:border-b-0 last:pb-0">
            {editId === ev._id ? (
                <>
                    <input
                        value={editFields.nome}
                        onChange={(e) =>
                            setEditFields((f) => ({ ...f, nome: e.target.value }))
                        }
                        className="rounded px-3 py-2 mb-1"
                    />
                    <input
                        value={editFields.status}
                        onChange={(e) =>
                            setEditFields((f) => ({ ...f, status: e.target.value }))
                        }
                        className="rounded px-3 py-2 mb-1"
                    />
                    <input
                        value={editFields.meses}
                        onChange={(e) =>
                            setEditFields((f) => ({ ...f, meses: e.target.value }))
                        }
                        className="rounded px-3 py-2 mb-1"
                    />
                    <input
                        value={editFields.local}
                        onChange={(e) =>
                            setEditFields((f) => ({ ...f, local: e.target.value }))
                        }
                        className="rounded px-3 py-2 mb-1"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setEditFields((f) => ({ ...f, imagem: e.target.files[0] }))
                        }
                        className="rounded px-3 py-2 mb-1"
                    />
                    <div className="flex gap-2 mt-2">
                        <button
                            onClick={() => saveEdit(ev)}
                            className="bg-green-600 hover:bg-green-700 text-white rounded px-2 py-1 text-xs transition"
                        >
                            Salvar
                        </button>
                        <button
                            onClick={cancelEdit}
                            className="bg-gray-400 hover:bg-gray-500 text-white rounded px-2 py-1 text-xs transition"
                        >
                            Cancelar
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <span>
                        <b>Nome:</b> {ev.nome}
                    </span>
                    <span>
                        <b>Status:</b> {ev.status}
                    </span>
                    <span>
                        <b>Meses:</b> {ev.meses}
                    </span>
                    <span>
                        <b>Local:</b> {ev.local}
                    </span>
                    {ev.imagem && (
                        <img
                            src={`${import.meta.env.VITE_API_URL.replace("/api", "")}${ev.imagem}`}
                            alt={ev.nome}
                            className="w-32 h-20 object-cover rounded my-2 border"
                        />
                    )}
                    <div className="flex gap-2 mt-2">
                        <button
                            onClick={() => startEdit(ev)}
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded px-2 py-1 text-xs transition"
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => deletarEvento(ev._id)}
                            className="bg-red-600 hover:bg-red-700 text-white rounded px-2 py-1 text-xs transition"
                        >
                            Remover
                        </button>
                    </div>
                </>
            )}
        </li>
    );
}