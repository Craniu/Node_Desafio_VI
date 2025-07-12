import { buscarPorEmailModel } from "../models/user.models.js";
import { addLog } from "../helpers/loger.js"
import  'dotenv/config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body || {};
        if(!email || !password){ 
            addLog('ERROR', 'LOGIN', 'todos los datos son requeridos')
            return res.status(400).send('Todos los campos son requeridos');
        }
        const user = await buscarPorEmailModel(email);
        if(!user){
            addLog('ERROR', 'LOGIN', 'Usuario no encpontrado');
            return res.status(400).send('Usuario o contraseña invalidos');
        }
        if(!bcrypt.compareSync(password, user.password)){
            addLog('ERROR', 'LOGIN', 'Contraseña incorrecta');
            return res.status(400).send('Usuario o contraseña invalidos');
        }
        const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION});
        return res.status(200).json({token})
    }catch(e){
        addLog('ERROR', 'LOGIN', e.message);
        console.log(e)
        return res.status(500).json({Error: e.message})
    }
}

