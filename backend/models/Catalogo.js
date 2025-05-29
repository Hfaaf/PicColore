import mongoose from 'mongoose';
const catalogoSchema = new mongoose.Schema({
    nome: String,
    imgsUrl: String,
    descricao: String,
});

export default mongoose.model('Catalogo', catalogoSchema);