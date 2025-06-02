import { useState } from 'react';
import emailValidator from 'email-validator';
import CustomButton from './CustomButton';

export default function Footer() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    async function sendEmail(e) {
        e.preventDefault();

        if (!name || !email || !message) {
            alert("Preencha todos os campos.");
            return;
        }

        if (!emailValidator.validate(email)) {
            alert("Por favor, insira um e-mail válido.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, message })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Email enviado com sucesso!");
                setName('');
                setEmail('');
                setMessage('');
            } else {
                alert("Erro ao enviar o email: " + (data.error || "Tente novamente."));
            }
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro ao enviar o email.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <footer className="w-screen bg-[#F9C348] flex justify-center items-center py-12">
            <div className="bg-[#F95D08] rounded-xl p-6 w-full max-w-xs flex flex-col items-center">
                <span className="text-white font-bold text-lg mb-4 text-center">fale conosco</span>
                <form className="w-full flex flex-col gap-8" onSubmit={sendEmail}>
                    <input
                        type="text"
                        placeholder="Insira seu nome"
                        className="rounded px-3 py-2 text-sm outline-none"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    <input
                        type="email"
                        placeholder="Insira seu email"
                        className="rounded px-3 py-2 text-sm outline-none"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <textarea
                        placeholder="Insira sua mensagem"
                        className="rounded px-3 py-2 text-sm outline-none resize-none h-20"
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                    />
                    <div className="mt-2 self-center">
                        <CustomButton
                            bgColor="#22c55e"
                            hoverColor="#16a34a"
                            textColor="#fff"
                            type="submit"
                            rounded="rounded-lg"
                            disabled={loading}
                        >
                            {loading ? 'ENVIANDO...' : 'ENVIAR'}
                        </CustomButton>
                    </div>
                </form>
            </div>
        </footer>
    );
}
