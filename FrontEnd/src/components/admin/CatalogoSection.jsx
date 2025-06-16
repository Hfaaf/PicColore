import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import CatalogoForm from "./CatalogoForm";
import CatalogoEditForm from "./CatalogoEditForm";
import { SortableItem } from "../../components/SortableItem";

export default function CatalogoSection({ token }) {
  const [catalogo, setCatalogo] = useState([]);
  const [catalogoEditId, setCatalogoEditId] = useState(null);
  const [catalogoEditFields, setCatalogoEditFields] = useState({
    nome: "",
    descricao: "",
    imagem: null,
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  useEffect(() => {
    carregarCatalogo();
  }, []);

  async function carregarCatalogo() {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/catalogo`);
      const data = await res.json();
      setCatalogo(data);
    } catch (error) {
      console.error("Erro ao carregar catálogo:", error);
    }
  }

  async function handleDragEnd(event) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = catalogo.findIndex(item => item._id === active.id);
    const newIndex = catalogo.findIndex(item => item._id === over.id);

    const newCatalogo = arrayMove(catalogo, oldIndex, newIndex);
    setCatalogo(newCatalogo);

    try {
        const bulkOps = newCatalogo.map((item, index) => ({
            id: item._id,
            order: index + 1
        }));

        await Promise.all(bulkOps.map(async (op) => {
            await fetch(`${import.meta.env.VITE_API_URL}/catalogo/${op.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify({ order: op.order }),
            });
        }));
    } catch (error) {
        console.error("Erro ao atualizar ordem:", error);
        carregarCatalogo();
    }
}


  async function deletarCatalogo(id) {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/catalogo/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      
      if (res.ok) {
        setCatalogo(catalogo.filter((item) => item._id !== id));
      } else {
        throw new Error("Erro ao deletar catálogo");
      }
    } catch (error) {
      console.error("Erro ao deletar item:", error);
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
    
    try {
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
        await carregarCatalogo();
      } else {
        throw new Error("Erro ao editar catálogo");
      }
    } catch (error) {
      console.error("Erro ao editar item:", error);
    }
  }

  return (
    <>
      <h3 className="text-xl font-bold mb-4 text-[#F95D08] mt-8">Catálogo de Eventos</h3>
      <CatalogoForm token={token} setCatalogo={setCatalogo} />

      {catalogo.length > 0 && (
        <div className="mt-4">
          <h4 className="text-lg font-semibold text-[#7F42CE] mb-2">Itens no Catálogo</h4>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={catalogo.map(item => item._id)}
              strategy={verticalListSortingStrategy}
            >
              <ul className="space-y-2">
                {catalogo.map((item) => (
                  <SortableItem key={item._id} id={item._id}>
                    <li className="flex items-center justify-between bg-white rounded-lg p-3 shadow">
                      <div className="flex-grow flex items-center">
                        <div>
                          <strong>{item.nome}</strong>
                          <p className="text-sm text-gray-600">{item.descricao}</p>
                        </div>
                      </div>
                      {item.imagem && (
                        <img
  src={item.imagem}
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
                  </SortableItem>
                ))}
              </ul>
            </SortableContext>
          </DndContext>
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
