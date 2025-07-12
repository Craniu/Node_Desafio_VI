import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { addLog } from '../src/helpers/loger.js';

export const validaToken = async (req, res,  next) => {
    try {
        const token = req.header('Authorization');
        if(!token){
            addLog('ERROR', 'ValidaToken', 'Token invalido');
            return res.status(400).send('Token invalido');
        }
        const [bearer, tokenValue] = token.split(' ');
        if(bearer !== 'Bearer' || !tokenValue){
            addLog('ERROR', 'ValidaToken', 'Formato de token no valido');
            return res.status(400).send('Formato de token no valido');
        }
        const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET)
        console.log("toke decode: " + decoded)
        req.user = decoded.email;
        next();
    }catch(e){
        console.log(e);
        addLog('ERROR', 'ValidaToken', 'e.message')
        return res.status(500).send({error: e.message});
    }
}

