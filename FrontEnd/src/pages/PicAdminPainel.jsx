import { useEffect, useState } from "react";

export default function AdminPanel() {
  const [eventos, setEventos] = useState([]);
  const [nome, setNome] = useState("");
  const [status, setStatus] = useState("");
  const [meses, setMeses] = useState("");
  const [local, setLocal] = useState("");
  const [imagemFile, setImagemFile] = useState(null);
  const [msg, setMsg] = useState("");
  const [editId, setEditId] = useState(null);
  const [editFields, setEditFields] = useState({});
  const [carrouselImages, setCarrouselImages] = useState([]);
  const [carrouselMsg, setCarrouselMsg] = useState("");
  const [carrouselFile, setCarrouselFile] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/agenda`)
      .then(res => res.json())
      .then(setEventos);
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/carrousel`)
      .then(res => res.json())
      .then(setCarrouselImages);
  }, []);

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
        "Authorization": "Bearer " + token
      },
      body: formData
    });
    if (res.ok) {
      setMsg("Evento adicionado!");
      setNome("");
      setStatus("");
      setMeses("");
      setLocal("");
      setImagemFile(null);
      fetch(`${import.meta.env.VITE_API_URL}/agenda`)
        .then(res => res.json())
        .then(setEventos);
    } else {
      setMsg("Erro ao adicionar evento");
    }
  }

  async function deletarEvento(id) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/agenda/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + token
      }
    });
    if (res.ok) {
      setEventos(eventos.filter(ev => ev._id !== id));
    }
  }

  function startEdit(ev) {
    setEditId(ev._id);
    setEditFields({
      nome: ev.nome,
      status: ev.status,
      meses: ev.meses,
      local: ev.local,
      imagem: null
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
        "Authorization": "Bearer " + token
      },
      body: formData
    });
    if (res.ok) {
      setEditId(null);
      setEditFields({});
      fetch(`${import.meta.env.VITE_API_URL}/agenda`)
        .then(res => res.json())
        .then(setEventos);
    }
  }

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
        "Authorization": "Bearer " + token
      },
      body: formData
    });
    if (res.ok) {
      setCarrouselMsg("Imagem enviada!");
      setCarrouselFile(null);
      fetch(`${import.meta.env.VITE_API_URL}/carrousel`)
        .then(res => res.json())
        .then(setCarrouselImages);
    } else {
      setCarrouselMsg("Erro ao enviar imagem");
    }
  }

  async function deletarImagem(id) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/carrousel/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + token
      }
    });
    if (res.ok) {
      setCarrouselImages(carrouselImages.filter(img => img._id !== id));
    }
  }

  return (
    <div className="flex justify-center mt-36 mb-16 px-2">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 md:p-10 border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#7F42CE]" style={{ fontFamily: '"Baloo Bhai 2", sans-serif' }}>
          Painel Administrativo
        </h2>

        <h3 className="text-xl font-bold mb-4 text-[#F95D08]">Eventos</h3>
        <ul className="mb-6">
          {eventos.map(ev => (
            <li key={ev._id} className="mb-4 flex flex-col border-b pb-3 last:border-b-0 last:pb-0">
              {editId === ev._id ? (
                <>
                  <input
                    value={editFields.nome}
                    onChange={e => setEditFields(f => ({ ...f, nome: e.target.value }))}
                    className="rounded px-3 py-2 mb-1"
                  />
                  <input
                    value={editFields.status}
                    onChange={e => setEditFields(f => ({ ...f, status: e.target.value }))}
                    className="rounded px-3 py-2 mb-1"
                  />
                  <input
                    value={editFields.meses}
                    onChange={e => setEditFields(f => ({ ...f, meses: e.target.value }))}
                    className="rounded px-3 py-2 mb-1"
                  />
                  <input
                    value={editFields.local}
                    onChange={e => setEditFields(f => ({ ...f, local: e.target.value }))}
                    className="rounded px-3 py-2 mb-1"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => setEditFields(f => ({ ...f, imagem: e.target.files[0] }))}
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
                  <span><b>Nome:</b> {ev.nome}</span>
                  <span><b>Status:</b> {ev.status}</span>
                  <span><b>Meses:</b> {ev.meses}</span>
                  <span><b>Local:</b> {ev.local}</span>
                  {ev.imagem && (
                    <img
                      src={`${import.meta.env.VITE_API_URL.replace('/api','')}${ev.imagem}`}
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
          ))}
        </ul>
        <form onSubmit={adicionarEvento} className="flex flex-col gap-3 bg-[#F9C348] rounded-xl p-4 mb-8 shadow">
          <h4 className="text-lg font-semibold text-[#7F42CE] mb-2">Adicionar novo evento</h4>
          <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome" className="rounded px-3 py-2" />
          <input value={status} onChange={e => setStatus(e.target.value)} placeholder="Status" className="rounded px-3 py-2" />
          <input value={meses} onChange={e => setMeses(e.target.value)} placeholder="Meses (ex: Maio | Junho)" className="rounded px-3 py-2" />
          <input value={local} onChange={e => setLocal(e.target.value)} placeholder="Localização" className="rounded px-3 py-2" />
          <input
            type="file"
            accept="image/*"
            onChange={e => setImagemFile(e.target.files[0])}
            className="rounded px-3 py-2"
          />
          <button type="submit" className="bg-green-600 hover:bg-green-700 text-white rounded py-2 font-bold mt-2 transition">Adicionar Evento</button>
          {msg && <div className="text-center text-sm text-[#7F42CE] mt-2">{msg}</div>}
        </form>

        <h3 className="text-xl font-bold mb-4 text-[#F95D08]">Imagens do Carrossel</h3>
        <form onSubmit={uploadCarrouselImage} className="flex flex-col md:flex-row gap-2 items-center mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={e => setCarrouselFile(e.target.files[0])}
            className="rounded px-2 py-1 border"
          />
          <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white rounded px-4 py-2 font-bold transition">Enviar</button>
          {carrouselMsg && <span className="ml-2 text-red-500">{carrouselMsg}</span>}
        </form>
        <div className="flex flex-wrap gap-4">
          {carrouselImages.map(img => (
            <div key={img._id} className="relative">
              <img src={`${import.meta.env.VITE_API_URL.replace('/api','')}${img.url}`} alt="Carrossel" className="w-32 h-20 object-cover rounded border" />
              <button
                onClick={() => deletarImagem(img._id)}
                className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded px-2 py-1 text-xs transition"
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}