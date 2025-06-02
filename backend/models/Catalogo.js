import mongoose from 'mongoose';

const catalogoSchema = new mongoose.Schema({
    nome: String,
    imagem: String,
    descricao: String,
    order: { type: Number, default: 0 }
});

export default mongoose.model('Catalogo', catalogoSchema);