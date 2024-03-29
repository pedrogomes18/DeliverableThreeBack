import { JwtPayload } from 'jwt-decode';
import { NextFunction, Request, Response } from 'express';
import AppError from '@shared/errors/AppError';
import { Secret, verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');
  try {
    const decoded = verify(token, authConfig.jwt.secret as Secret);

    const { sub } = decoded as JwtPayload;
    req.user = {
      id: sub as string,
    };

    return next();
  } catch (error) {
    throw new AppError('Invalid JWT token', 401);
  }
}
