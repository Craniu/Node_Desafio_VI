import { Pool } from "pg";
import 'dotenv/config';


export const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    allowExitOnIdle: true
})

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error al conectar a la base de datos', err);
    } else {
        console.log('Conexión exitosa a la base de datos:', res.rows[0]);
    }
});