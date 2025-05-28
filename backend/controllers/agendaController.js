import Evento from '../models/Evento.js';

export async function listEventos(req, res) {
  const eventos = await Evento.find();
  res.json(eventos);
}

export async function addEvento(req, res) {
  let data = req.body;
  if (req.file) {
    data = { ...data, imagem: `/uploads/${req.file.filename}` };
  }
  const evento = await Evento.create(data);
  res.json(evento);
}

export async function deleteEvento(req, res) {
  await Evento.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
}

export async function updateEvento(req, res) {
  let data = req.body;
  if (req.file) {
    data = { ...data, imagem: `/uploads/${req.file.filename}` };
  }
  const evento = await Evento.findByIdAndUpdate(req.params.id, data, { new: true });
  res.json(evento);
}