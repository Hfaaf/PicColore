import { useState } from "react";

export default function EventoForm({ token, setEventos }) {
    const [nome, setNome] = useState("");
    const [status, setStatus] = useState("");
    const [meses, setMeses] = useState("");
    const [local, setLocal] = useState("");
    const [imagemFile, setImagemFile] = useState(null);
    const [msg, setMsg] = useState("");

    async function adicionarEvento(e) {
        e.preventDefault();
        setMsg("");
        const formData = new FormData();
        formData.append("nome", nome);
        formData.append("status", status);
        formData.append("meses", meses);
        formData.append("local", local);
        if (imagemFile) formData.append("imagem", imagemFile);

        const res = await fetch(`${import.meta.env.VITE_API_URL}/agenda`, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
            },
            body: formData,
        });
        if (res.ok) {
            setMsg("Evento adicionado!");
            setNome("");
            setStatus("");
            setMeses("");
            setLocal("");
            setImagemFile(null);
            fetch(`${import.meta.env.VITE_API_URL}/agenda`)
                .then((res) => res.json())
                .then(setEventos);
        } else {
            setMsg("Erro ao adicionar evento");
        }
    }

    return (
        <form
            onSubmit={adicionarEvento}
            className="flex flex-col gap-3 bg-[#F9C348] rounded-xl p-4 mb-8 shadow"
        >
            <h4 className="text-lg font-semibold text-[#7F42CE] mb-2">
                Adicionar novo evento
            </h4>
            <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome"
                className="rounded px-3 py-2"
            />
            <input
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                placeholder="Status"
                className="rounded px-3 py-2"
            />
            <input
                value={meses}
                onChange={(e) => setMeses(e.target.value)}
                placeholder="Meses (ex: Maio | Junho)"
                className="rounded px-3 py-2"
            />
            <input
                value={local}
                onChange={(e) => setLocal(e.target.value)}
                placeholder="Localização"
                className="rounded px-3 py-2"
            />
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setImagemFile(e.target.files[0])}
                className="rounded px-3 py-2"
            />
            <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white rounded py-2 font-bold mt-2 transition"
            >
                Adicionar Evento
            </button>
            {msg && <div className="text-center text-sm text-[#7F42CE] mt-2">{msg}</div>}
        </form>
    );
}