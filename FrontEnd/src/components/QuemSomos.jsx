import React, { useEffect, useState } from 'react';

import peImg from '../assets/PersonsFooter/PE.png';
import pdImg from '../assets/PersonsFooter/PD.png';

import Carroussel from './Carroussel';

export default function QuemSomos() {
    const [imagens, setImagens] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/carrousel`)
            .then(res => res.json())
            .then(data => setImagens(data.map(img => `${import.meta.env.VITE_API_URL.replace('/api','')}${img.url}`)));
    }, []);

    return (
        <>
            <div className="mt-24 w-screen overflow-x-hidden">
                <Carroussel images={imagens} imgClassName="w-screen object-contain" />
            </div>
            <div
                className="flex flex-col lg:flex-row items-center justify-center h-full w-screen p-4 md:p-10 lg:p-20 text-white"
                style={{
                    backgroundColor: '#F95D08'
                }}
            >
                <div className="hidden lg:block lg:mr-8">
                    <img
                        src={peImg}
                        alt="Personagens esquerda"
                        className="h-[320px] object-contain select-none pointer-events-none"
                        draggable="false"
                    />
                </div>
                <div className='flex flex-col items-center justify-center max-w-3xl text-lg md:text-xl lg:text-2xl text-center'>
                    <h1
                        style={{
                            color: '#FFDB08',
                            fontFamily: '"Baloo Bhai 2", sans-serif',
                            textShadow: '1px 1px 2px black',
                        }}
                        className='text-3xl md:text-6xl lg:text-7xl font-bold text-center mb-8 mt-5'
                    >
                        Quem somos
                    </h1>
                    <p className="italic text-white text-center mb-4">
                        Somos uma empresa especializada no desenvolvimento, fabricação e operacionalização de playgrounds.
                    </p>
                    <p className="italic text-white text-center mb-4">
                        Nossos parques são pensados para proporcionar alegria e interação, não só para os pequenos, mas para toda a família, com segurança, higiene e conforto.
                    </p>
                    <p className="italic text-white text-center">
                        Cada evento leva em seu DNA uma verdadeira experiência imersiva em brincadeiras e cenárioa que despertam a imaginação e maior diversão.
                    </p>
                </div>
                <div className="hidden lg:block lg:ml-8">
                    <img
                        src={pdImg}
                        alt="Personagens direita"
                        className="h-[320px] object-contain select-none pointer-events-none"
                        draggable="false"
                    />
                </div>
            </div>
        </>
    )
}