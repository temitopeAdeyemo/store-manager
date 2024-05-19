import jwt, { sign, verify } from 'jsonwebtoken';
import environment from '../../config/environments.config';
import AppError from '../../shared/utils/AppError';
class JwtClient {
  private accessTokenSecret: string;
  private refreshTokenSecret: string;

  constructor() {
    this.accessTokenSecret = environment.jwtAccessTokenSecret as string;
    this.refreshTokenSecret = environment.jwtRefreshTokenSecret as string;
  }

  generateAccessToken(payload: any) {
    return sign(payload, this.accessTokenSecret, { expiresIn: '1h' });
  }

  generateRefreshToken(payload: any) {
    payload.type = 'refresh';
    return sign(payload, this.refreshTokenSecret, { expiresIn: '1500' });
  }

  verifyAccessToken(token: string): any {
    return verify(token, this.accessTokenSecret);
  }

  verifyRefreshToken(token: any) {
    if (token.type !== 'refresh') {
      throw new AppError('Invalid token type', 401);
    }
    return verify(token, this.refreshTokenSecret);
  }
}

export default JwtClient;
