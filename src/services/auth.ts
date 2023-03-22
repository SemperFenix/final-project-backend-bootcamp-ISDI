import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import { HTTPError } from '../common/errors/http.error.js';
import bcrypt from 'bcryptjs';

const salt = 10;

export interface TokenPayload extends jwt.JwtPayload {
  id: string;
  email: string;
  role: string;
}

export class Auth {
  static createToken(payload: TokenPayload) {
    if (!config.secret) throw new Error('No secret');
    return jwt.sign(payload, config.secret);
  }

  static getTokenInfo(token: string) {
    if (!config.secret) throw new Error('No secretto');
    const tokenInfo = jwt.verify(token, config.secret);
    if (typeof tokenInfo === 'string')
      throw new HTTPError(498, 'Invalid Token', tokenInfo);
    return tokenInfo as TokenPayload;
  }

  static hash(value: string) {
    return bcrypt.hash(value, salt);
  }

  static compareHash(value: string, hash: string) {
    return bcrypt.compare(value, hash);
  }
}
