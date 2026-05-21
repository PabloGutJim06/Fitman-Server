import Groq from "groq-sdk";

if (!process.env.GROQ_API_KEY) {
    console.error("GROQ_API_KEY no está definida.");
    process.exit(1);
}

const client = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export const enviarMensaje = async (req, res, next) => {
    try {
        const { messages, system } = req.body;

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({
                error: "El campo 'messages' es obligatorio"
            });
        }

        if (messages.length > 50) {
            return res.status(400).json({
                error: "Demasiados mensajes en el historial"
            });
        }

        const response = await client.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            max_tokens: 1024,
            messages: [
                { role: "system", content: system ?? "Eres un asistente de fitness." },
                ...messages,
            ],
        });

        res.status(200).json({
            content: response.choices[0].message.content,
        });
    } catch (error) {
        next(error);
    }
};