import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
   constructor(
      private prisma: PrismaService,
      private jwt: JwtService,
      private config: ConfigService,
    ) {}

   //           ================= 
   //              REGISTER 
   //           =================
   async register (dto: RegisterDto) {
      const existingUser = await this.prisma.user.findUnique({
         where: { email: dto.email }
      });

      if (existingUser) {
         throw new ConflictException({
           code: 'EMAIL_TAKEN',
           message: 'Email sudah terdaftar',
         })
       }

      const hashedPassword = await bcrypt.hash(dto.password, 10);

      const user = await this.prisma.user.create({
         data: {
            name: dto.username,
            email: dto.email,
            password_hash: hashedPassword,
         },
         select: {
            id: true,
            name: true,
            email: true,
         }
      })

      return { message: 'user berhasil didaftarkan', user };
   }

   //          ================= 
   //                LOGIN 
   //          =================
   async login (dto: LoginDto) {
      const user = await this.validateUser(dto.email, dto.password);
      const token = this.generateToken(user.id, user.email);

      return { 
         message: 'user berhasil login', 
         access_token: token,
         user: {
            id: user.id,
            name: user.name,
            email: user.email,
         }
      }
   };

   //          =================
   //              HELPERS
   //          =================
   private generateToken(
      userId: string,
      email: string,
   ) {
      return this.jwt.sign(
        { userId, email },
        {
          secret: this.config.get<string>('JWT_SECRET'),
          expiresIn: '1d',
        },
      );
   }

   private async validateUser(email: string, password: string) {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });
    
      if (!user) {
        throw new UnauthorizedException('Email atau password salah');
      }
    
      const isMatch = await bcrypt.compare(password, user.password_hash);
    
      if (!isMatch) {
        throw new UnauthorizedException('Email atau password salah');
      }
    
      return user;
   }
}
