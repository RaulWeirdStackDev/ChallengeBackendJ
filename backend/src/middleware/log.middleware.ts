import { Request, Response, NextFunction } from 'express';

export const log = (req: Request, _: Response, next: NextFunction) => {
  console.log({
    method: req.method,
    body: req.body,
    params: req.params,
    query: req.query,
  });
  next();
};
