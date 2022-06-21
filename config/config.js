import path from 'path';
import dotenv from 'dotenv';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const data = dotenv.config({
    path: path.resolve(__dirname, `../environments/.env.${process.env.NODE_ENV}`)
})

console.log(process.env.USERS);

export const db = {
    user: process.env.USERS,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
};

export const api = {
    port: process.env.PORT,
};


