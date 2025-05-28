import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  nome: String,
  status: String,
  imagem: String,
  meses: String,
  local: String
});
export default mongoose.model('Evento', schema);
