import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class UsersMiddleware implements NestMiddleware {
  //req: any, res: any, next: () => void 
  use(req: Request, res: Response, next: NextFunction) { // the type is not usually generated automatically like Request and Response NextFunction are manual input
    console.log('Authorization header: ', req.headers.authorization);
    const { authorization } = req.headers;
    if (!authorization) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
    }
    else if (authorization != '123') {
      throw new HttpException('Invalid Auth Token', HttpStatus.UNAUTHORIZED)
    }
    next();
  }
}
