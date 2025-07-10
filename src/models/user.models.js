import { pool } from '../../BD/config.js';
import format from 'pg-format';

//Crear usuarios
export const registrarUsuarioModel = async ({ email, password, rol, lenguage }) => {
    const query = format(
        'insert into usuarios (email, password, rol, lenguage) values (%L, %L, %L, %L) returning email, rol, lenguage',
        email, password, rol, lenguage
    );
    const resultado = await pool.query(query);
    return resultado.rows[0];
}

//Buscar por email
export const buscarPorEmailModel = async (email) => {
    const query = format('select * from usuarios where email = %L', email);
    const resultado = await pool.query(query);
    return resultado.rows[0];
}