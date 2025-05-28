import { useRef, useState } from "react";
import P1 from "../assets/Persons/P1.png";
import P2 from "../assets/Persons/P2.png";

export default function TrabalheConosco() {
    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState("");

    function handleFileChange(e) {
        if (e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName("");
        }
    }

    return (
        <>
            <div className="relative min-h-screen flex flex-col items-center justify-center bg-white overflow-x-hidden">
                <img
                    src={P2}
                    alt="Personagem 1"
                    className="hidden md:block absolute left-2 top-24 w-40 md:w-56 lg:w-[340px]"
                    style={{ zIndex: 2 }}
                />
                <img
                    src={P1}
                    alt="Personagem 2"
                    className="hidden md:block absolute right-2 bottom-8 w-40 md:w-56 lg:w-[340px]"
                    style={{ zIndex: 2 }}
                />

                <h1 className="text-3xl md:text-5xl font-bold text-center mt-10 mb-8 text-[#8B5CF6] drop-shadow-md"
                    style={{
                            fontFamily: '"Baloo Bhai 2", sans-serif',
                            textShadow: '1px 1px 2px black',
                        }}
                >
                    Trabalhe conosco
                </h1>

                <div className="w-[90vw] max-w-md bg-[#F95D08] rounded-2xl p-4 md:p-8 flex flex-col items-center shadow-lg z-10 mb-10">
                    <form className="w-full flex flex-col gap-5">
                        <input
                            type="text"
                            placeholder="Insira seu nome"
                            className="rounded px-4 py-2 text-base outline-none"
                        />
                        <input
                            type="email"
                            placeholder="Insira seu email"
                            className="rounded px-4 py-2 text-base outline-none"
                        />
                        <input
                            type="text"
                            placeholder="Insira seu cpf"
                            className="rounded px-4 py-2 text-base outline-none"
                        />
                        <textarea
                            placeholder="Por que deveríamos te contratar?"
                            className="rounded px-4 py-2 text-base outline-none resize-none h-20"
                        />
                        <button
                            type="button"
                            className="bg-white font-bold py-2 px-4 rounded-lg border-2 border-[#F95D08]"
                            onClick={() => fileInputRef.current && fileInputRef.current.click()}
                        >
                            Envie seu currículo (PDF)
                        </button>
                        <input
                            type="file"
                            accept="application/pdf"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />
                        <span className="text-white text-sm text-center min-h-[1.5em]">
                            {fileName
                                ? `Arquivo anexado: ${fileName}`
                                : "Nenhum arquivo anexado"}
                        </span>
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-8 rounded-lg mt-2 self-center transition"
                        >
                            ENVIAR
                        </button>
                    </form>
                </div>
            </div>
            <footer className="w-screen h-60 bg-[#F9C348] flex justify-center items-center py-12" />
        </>
    );
}