import CarouselImage from '../models/CarouselImage.js'

export async function uploadImage(req, res) {
  const url = req.file && req.file.path ? req.file.path : null;
  const image = await CarouselImage.create({ url });
  res.json(image);
}

export async function listImages(req, res) {
  const images = await CarouselImage.find();
  res.json(images);
}

export async function deleteImage(req, res) {
  await CarouselImage.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
}