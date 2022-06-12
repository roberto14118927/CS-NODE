import { config } from "dotenv";
config({ path: process.ENV })


export const api = {
    port: process.env.API_PORT || 3000,
};

export const db = {
    user: 'qzvtqibamjqmpw',
    host: 'ec2-52-72-99-110.compute-1.amazonaws.com',
    database: 'db91640ogiho29',
    password: '5a07797fd00165fcd6829fc3b24df949575a8e0cb63d2c4b084e244c682d28ed',
    port: '5432',
};