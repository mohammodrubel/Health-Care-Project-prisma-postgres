import jwt, { JwtPayload } from 'jsonwebtoken';

const verifyToken = async (token: string, secret: string) => {
    const verifyUser = await jwt.verify(token, secret) as JwtPayload;
    return verifyUser;
}

export default verifyToken;
