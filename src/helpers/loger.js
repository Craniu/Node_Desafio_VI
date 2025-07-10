import { appendFile } from 'fs/promises';
import { existsSync } from 'fs';
import 'dotenv/config';

const logFile = process.env.LOG_FILE || './logs/server.log';

export const addLog = async (evento, mensaje) => {
    const logMensaje = `${new Date().toISOString()} - ${evento} - message: ${mensaje}`;
    try{
        if (!existsSync(logFile)) {
            await appendFile(logFile, '');
        }
            await appendFile(logFile, logMensaje + '\n');
    }catch(e){
        console.error('Error al escribir en el archivo de log:', e);
    }
}


// Funcion para resgistrar eventos en un archivo log
//Recibe el tipo de evento y el mensaje luego verifica la ruta del log si no existe la crea y guarda los datos
//El mensaje se guarda con la fecha y hora actual
//Modo de uso: addLog('evento', 'mensaje');
