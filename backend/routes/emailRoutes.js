import express from 'express';
import emailjs from '@emailjs/nodejs';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Preencha todos os campos.' });
    }

    const templateParams = { name, email, message };

    try {
        const response = await emailjs.send(
            process.env.EMAILJS_SERVICE_ID,
            process.env.EMAILJS_TEMPLATE_ID,
            templateParams,
            {
                publicKey: process.env.EMAILJS_PUBLIC_KEY,
                privateKey: process.env.EMAILJS_PRIVATE_KEY
            }
        );


        return res.status(200).json({ success: true, response });
    } catch (error) {
        console.error('Erro ao enviar email:', error);
        return res.status(500).json({ error: 'Erro no envio do email.' });
    }
});

export default router;
