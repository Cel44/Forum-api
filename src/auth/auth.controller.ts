import {
   Controller,
   Post,
   Body,
   UseGuards,
   Get,
   Req,
 } from '@nestjs/common';
 import { AuthService } from './auth.service';
 import { RegisterDto } from './dto/register.dto';
 import { LoginDto } from './dto/login.dto';
 import { JwtAuthGuard } from './jwt.guard';
 
 @Controller('auth')
 export class AuthController {
   constructor(private authService: AuthService) {}
 
   // ======================
   // REGISTER
   // ======================
   @Post('register')
   register(@Body() dto: RegisterDto) {
     return this.authService.register(dto);
   }
 
   // ======================
   // LOGIN
   // ======================
   @Post('login')
   login(@Body() dto: LoginDto) {
     return this.authService.login(dto);
   }
   
}