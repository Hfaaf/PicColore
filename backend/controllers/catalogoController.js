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
        if (req.file && req.file.path) {
            data = { ...data, imagem: req.file.path };
        }
        const count = await Catalogo.countDocuments();
        data.order = count + 1;
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
        if (req.file && req.file.path) {
            data = { ...data, imagem: req.file.path };
        }

        const catalogo = await Catalogo.findByIdAndUpdate(req.params.id, data, { new: true });

        if (data.order !== undefined) {
            await Catalogo.updateOne({ _id: req.params.id }, { $set: { order: data.order } });
        }

        res.json(catalogo);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar evento", error });
    }
}