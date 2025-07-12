import { addLog } from "../src/helpers/loger.js";

export const logRutasMiddleware = async (req, res, next) => {
    const logMessage = {
            method: req.method,
            body: req.body,
            params: req.params,
            query: req.query,
            Ip: req.ip
        }
    console.log('Log de la petición:', logMessage);
    await addLog('PETICION',logMessage);
    next();
}
