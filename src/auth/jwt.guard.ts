import {
   CanActivate,
   ExecutionContext,
   Injectable,
   UnauthorizedException,
 } from '@nestjs/common';
 import { JwtService } from '@nestjs/jwt';
 import { ConfigService } from '@nestjs/config';
 
 @Injectable()
 export class JwtAuthGuard implements CanActivate {
   constructor(
     private jwt: JwtService,
     private config: ConfigService,
   ) {}
 
   canActivate(context: ExecutionContext): boolean {
     const req = context.switchToHttp().getRequest();
 
     const authHeader = req.headers.authorization;
 
     if (!authHeader) {
       throw new UnauthorizedException('No token provided');
     }
 
     const token = authHeader.split(' ')[1]; 
     // format: Bearer TOKEN
 
     if (!token) {
       throw new UnauthorizedException('Invalid token format');
     }
 
     try {
       const decoded = this.jwt.verify(token, {
         secret: this.config.get<string>('JWT_SECRET'),
       });
 
       req.user = decoded; // attach user to request
       return true;
     } catch (err) {
       throw new UnauthorizedException('Invalid token');
     }
   }
 }