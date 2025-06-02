import Catalogo from "../models/Catalogo.js";

export async function listCatalogo(req, res) {
    try {
        const catalogo = await Catalogo.find().sort({ order: 1 });
        res.json(catalogo);
    } catch (error) {
        res.status(500).json({ message: "Erro ao listar evento", error });
    }
}

export async function addCatalogo(req, res) {
    try {
        let data = req.body;
        if (req.file) {
            data = { ...data, imagem: `/uploads/${req.file.filename}` };
        }
        const count = await Catalogo.countDocuments();
        data.order = count;
        const catalogo = await Catalogo.create(data);
        res.status(201).json(catalogo);
    } catch (error) {
        res.status(500).json({ message: "Erro ao adicionar evento", error });
    }
}

export async function deleteCatalogo(req, res) {
    try {
        await Catalogo.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar evento", error });
    }
}

export async function updateCatalogo(req, res) {
    try {
        let data = req.body;
        if (req.file) {
            data = { ...data, imagem: `/uploads/${req.file.filename}` };
        }
        const catalogo = await Catalogo.findByIdAndUpdate(req.params.id, data, { new: true });
        res.json(catalogo);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar evento", error });
    }
}

export async function updateOrder(req, res) {
    try {
        const { order } = req.body;
        const bulkOps = order.map((id, index) => ({
            updateOne: {
                filter: { _id: id },
                update: { $set: { order: index } }
            }
        }));
        
        await Catalogo.bulkWrite(bulkOps);
        res.sendStatus(200);
    } catch (error) {
        console.error("Erro detalhado:", error);
        res.status(500).json({ 
            message: "Erro ao atualizar ordem",
            error: error.message 
        });
    }
}