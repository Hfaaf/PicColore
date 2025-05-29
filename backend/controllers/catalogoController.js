import Catalogo from "../models/Catalogo.js";

export async function listCatalogo(req, res) {
    try {
        const catalogo = await Catalogo.find();
        res.json(catalogo);
    } catch (error) {
        res.status(500).json({ message: "Erro ao listar evento", error });
    }
}
export async function addCatalogo(req, res) {
    try {
        let data = req.body;
        if (req.file) {
            data = { ...data, imgsUrl: `/uploads/${req.file.filename}` };
        }
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
            data = { ...data, imgsUrl: `/uploads/${req.file.filename}` };
        }
        const catalogo = await Catalogo.findByIdAndUpdate(req.params.id, data, { new: true });
        res.json(catalogo);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar evento", error });
    }
}