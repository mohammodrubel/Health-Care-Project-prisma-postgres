import jwt from 'jsonwebtoken';

const generateToken = async (payload: any, secret: string, expiresIn: string) => {
    const token = await jwt.sign(payload, secret, { expiresIn });
    return token;
}

export default generateToken;
