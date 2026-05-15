// index.js

import 'dotenv/config';
import express from 'express';
import rutinaRoutes from "./routes/rutina.routes.js";
import usuarioRoutes from "./routes/usuario.routes.js";
import registroRoutes from "./routes/registro.routes.js";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.use("/api/rutinas", rutinaRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/registros", registroRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.get('/', (req, res) => {
    res.json({ message: 'API del gimnasio funcionando correctamente' });
});

app.use((req, res, next) => {
    res.status(404).json({ error: `Ruta ${req.method} ${req.path} no encontrada` });
});

// Error handler global — Express lo identifica por sus 4 parámetros
app.use((err, req, res, next) => {
    const status = err.status ?? err.statusCode ?? 500;
    const message = err.message ?? "Error interno del servidor";

    if (process.env.NODE_ENV !== 'production') {
        console.error(err.stack);
    }

    res.status(status).json({ error: message });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});