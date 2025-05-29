import { useState, useEffect } from "react";
import EventoForm from "./EventoForm";
import EventoItem from "./EventoItem";

export default function EventosSection({ token }) {
    const [eventos, setEventos] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editFields, setEditFields] = useState({});

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/agenda`)
            .then((res) => res.json())
            .then(setEventos);
    }, []);

    async function deletarEvento(id) {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/agenda/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        if (res.ok) {
            setEventos(eventos.filter((ev) => ev._id !== id));
        }
    }

    function startEdit(ev) {
        setEditId(ev._id);
        setEditFields({
            nome: ev.nome,
            status: ev.status,
            meses: ev.meses,
            local: ev.local,
            imagem: null,
        });
    }

    function cancelEdit() {
        setEditId(null);
        setEditFields({});
    }

    async function saveEdit(ev) {
        const formData = new FormData();
        formData.append("nome", editFields.nome);
        formData.append("status", editFields.status);
        formData.append("meses", editFields.meses);
        formData.append("local", editFields.local);
        if (editFields.imagem) formData.append("imagem", editFields.imagem);

        const res = await fetch(`${import.meta.env.VITE_API_URL}/agenda/${ev._id}`, {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + token,
            },
            body: formData,
        });
        if (res.ok) {
            setEditId(null);
            setEditFields({});
            fetch(`${import.meta.env.VITE_API_URL}/agenda`)
                .then((res) => res.json())
                .then(setEventos);
        }
    }

    return (
        <>
            <h3 className="text-xl font-bold mb-4 text-[#F95D08]">Eventos</h3>
            <ul className="mb-6">
                {eventos.map((ev) => (
                    <EventoItem
                        key={ev._id}
                        ev={ev}
                        editId={editId}
                        editFields={editFields}
                        setEditFields={setEditFields}
                        deletarEvento={deletarEvento}
                        startEdit={startEdit}
                        cancelEdit={cancelEdit}
                        saveEdit={saveEdit}
                    />
                ))}
            </ul>
            <EventoForm token={token} setEventos={setEventos} />
        </>
    );
}