import { Request, Response, NextFunction } from 'express';

export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
  const newDate = new Date();
  const date = newDate.toLocaleDateString();
  const time = newDate.toLocaleTimeString();

  console.log(
    `Estas ejecutando un metodo ${req.method} en la ruta ${req.url} en el horario [${date} - ${time}]`,
  );
  next();
}
