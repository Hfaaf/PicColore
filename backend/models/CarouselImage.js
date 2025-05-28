import mongoose from 'mongoose';

const carouselImageSchema = new mongoose.Schema({
  url: String
});

const CarouselImage = mongoose.model('CarouselImage', carouselImageSchema);
export default CarouselImage;