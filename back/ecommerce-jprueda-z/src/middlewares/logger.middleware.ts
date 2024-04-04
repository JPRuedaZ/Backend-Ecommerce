// import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`Estas haciendo una peticion a la ruta ${req.url} de tipo ${req.method} a las ${new Date()}`);	
    next();	
}