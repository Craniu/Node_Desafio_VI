import { buscarPorEmailModel, registrarUsuarioModel } from "../models/user.models.js";
import { addLog } from "../helpers/loger.js";
import bcrypt from 'bcrypt';


//Manejo de rutas no encontradas
export const pageNotFound = async (req, res) => {
    res.status(404).send('La ruta solicitada no existe.');
}

//Registro de usuario
export const registrarUsuario = async (req, res) => {
    const { email, password, rol, lenguage} = req.body || {};
    if (!email || !password || !rol || !lenguage) {
        addLog('ERROR', 'Todos los campos son obligatorios');
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    if(await buscarPorEmailModel(email)){
        addLog('ERROR', `El email ${email} ya está registrado`);
        return res.status(400).json({ error: 'El email ya está registrado' });
    }
    try{
        const passwordHash = await bcrypt.hash(password, 10);
        const usuario = await registrarUsuarioModel({ email, password: passwordHash, rol, lenguage });
        addLog('INFO', `Usuario registrado: ${usuario.email}`);
        return res.status(201).json({mensaje: "Usuario Creado", usuario});
    } catch (e) {
        addLog('ERROR', `Error al registrar usuario: ${e.message}`);
        return res.status(500).json({ error: 'Error al registrar usuario' });
    }
}

//Buscar Usuario
export const buscarUsuario = async (req, res) => {
    try{
        const {email} = req.body || {};
    if(!email){
        addLog('ERROR', 'BuscarUsuario', 'Usuario no valido')
        return res.status(400).send('Usuario no valido');
    }
    const user = await buscarPorEmailModel(email);
    return res.status(200).json({id: user.id, email: user.email, rol: user.rol, lenguage: user.lenguage});
    }catch(e){
        addLog('ERROR', 'BuscarUsuarios', e.message);
        return res.status(500).send({Error: e.message})
    }
}


