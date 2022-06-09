import { config } from "dotenv";
config({ path: process.ENV })

console.log(process.env.user);

export const api = {
    port: process.env.API_PORT || 3000,
};

export const db = {
    user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: process.env.port,
};