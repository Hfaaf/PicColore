import mongoose from 'mongoose';
const catalogoSchema = new mongoose.Schema({
    nome: String,
    imagem: String,
    descricao: String,
});

export default mongoose.model('Catalogo', catalogoSchema);