import CustomButton from './CustomButton';

export default function Footer() {
    return (
        <footer className="w-screen bg-[#F9C348] flex justify-center items-center py-12">
            <div className="bg-[#F95D08] rounded-xl p-6 w-full max-w-xs flex flex-col items-center">
                <span className="text-white font-bold text-lg mb-4 text-center">fale conosco</span>
                <form className="w-full flex flex-col gap-8">
                    <input
                        type="text"
                        placeholder="Insira seu nome"
                        className="rounded px-3 py-2 text-sm outline-none"
                    />
                    <input
                        type="email"
                        placeholder="Insira seu email"
                        className="rounded px-3 py-2 text-sm outline-none"
                    />
                    <textarea
                        placeholder="Insira sua mensagem"
                        className="rounded px-3 py-2 text-sm outline-none resize-none h-20"
                    />
                    <div className="mt-2 self-center">
                        <CustomButton
                            bgColor="#22c55e"
                            hoverColor="#16a34a"
                            textColor="#fff"
                            rounded="rounded-lg"
                        >
                            ENVIAR
                        </CustomButton>
                    </div>
                </form>
            </div>
        </footer>
    );
}