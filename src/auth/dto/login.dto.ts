import {
   IsEmail,
   IsNotEmpty,
   IsString,
   MinLength,
   MaxLength,
 } from 'class-validator'
 import { ApiProperty } from '@nestjs/swagger'
 import { Transform } from 'class-transformer'
 
 export class LoginDto {
   @ApiProperty({ example: 'user@example.com' })
   @IsEmail({}, { message: 'Format email tidak valid' })
   @IsNotEmpty()
   @Transform(({ value }) => value?.toLowerCase().trim())
   email!: string
 
   @ApiProperty({ example: 'password123' })
   @IsString()
   @IsNotEmpty()
   @MinLength(8, { message: 'Password minimal 8 karakter' })
   @MaxLength(16, { message: 'Password maksimal 16 karakter' })
   @Transform(({ value }) => value?.trim())
   password!: string
 }