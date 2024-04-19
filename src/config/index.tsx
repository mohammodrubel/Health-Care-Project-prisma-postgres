import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path:path.join(process.cwd())})

export default {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    jwt_secret: process.env.JWT_SECRET,
    access_token: process.env.ACCESS_TOKEN_SECRET,
    refresh_token: process.env.REFRESH_TOKEN_SECRET,
    access_token_time: process.env.ACCESS_TOKEN_TIME,
    refresh_token_time: process.env.REFRESH_TOKEN_TIME,
};
