import BastidoresVid from '../assets/Bastidores.mp4';

export default function Bastidores() {
  return (
    <div className="flex flex-col items-center mt-16 mb-16 px-4">
      <h1 className="text-4xl font-extrabold text-purple-600 mb-2 drop-shadow"
        style={{
          fontFamily: '"Baloo Bhai 2", sans-serif',
          textShadow: '1px 1px 2px black',
        }}
      >
        Bastidores
      </h1>
      <p className="italic font-bold text-purple-500 text-lg text-center mb-1">
        Interessado em conhecer mais sobre a pic colorê?
      </p>
      <p className="italic font-bold text-purple-500 text-lg text-center mb-8">
        venha ver os nossos bastidores, como o seu evento favorito foi criado!
      </p>
      <div className="w-full max-w-2xl rounded-xl shadow-lg overflow-hidden">
        <div className="relative pt-[56.25%]"> {/* 16:9 Aspect Ratio */}
          <video
            src={BastidoresVid}
            title="Bastidores Pic Colore"
            controls
            className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}