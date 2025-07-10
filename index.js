import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { addLog } from './src/helpers/loger.js';
import { appMiddleware } from './middlewares/app.middleware.js';
import { router } from './routes/user.routes.js';


const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(appMiddleware);
app.use(router);

app.listen(port, () => {
  console.log(`Server ejecutándose en el puerto ${port}`);
    addLog('INFO', `Servidor iniciado en el puerto ${port}`);
});