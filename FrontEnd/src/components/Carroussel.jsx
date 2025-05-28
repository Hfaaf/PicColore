import { useState } from 'react'

export default function Carroussel({ images = [] }) {
  const [current, setCurrent] = useState(0)
  const length = images.length

  if (!Array.isArray(images) || images.length === 0) return null

  const goTo = (idx) => setCurrent(idx)
  const nextSlide = () => setCurrent(current === length - 1 ? 0 : current + 1)
  const prevSlide = () => setCurrent(current === 0 ? length - 1 : current - 1)

  return (
    <div id="indicators-carousel" className="relative w-full" data-carousel="static">

      <div className="relative h-56 overflow-hidden rounded-lg md:h-96 lg:h-[700px]">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`duration-700 ease-in-out absolute inset-0 ${idx === current ? 'block' : 'hidden'}`}
            data-carousel-item={idx === current ? 'active' : undefined}
          >
            <img
              src={img}
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt={`Slide ${idx + 1}`}
            />
          </div>
        ))}
      </div>
      <div className="absolute z-1 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
        {images.map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={`w-3 h-3 rounded-full ${idx === current ? 'bg-purple-600' : 'bg-gray-300'}`}
            aria-current={idx === current}
            aria-label={`Slide ${idx + 1}`}
            onClick={() => goTo(idx)}
            data-carousel-slide-to={idx}
          />
        ))}
      </div>
      <button
        type="button"
        className="absolute top-0 start-0 z-1 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={prevSlide}
        data-carousel-prev
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
          <svg className="w-4 h-4 text-white rtl:rotate-180" aria-hidden="true" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
          </svg>
          <span className="sr-only">Anterior</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-1 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={nextSlide}
        data-carousel-next
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
          <svg className="w-4 h-4 text-white rtl:rotate-180" aria-hidden="true" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
          </svg>
          <span className="sr-only">Proximo</span>
        </span>
      </button>
    </div>
  )
}