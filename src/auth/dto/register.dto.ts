import {
   IsEmail,
   IsNotEmpty,
   MinLength,
   IsString,
   MaxLength,
 } from 'class-validator'
 import { ApiProperty } from '@nestjs/swagger'
 import { Transform } from 'class-transformer'
 
 export class RegisterDto {
   @ApiProperty({ example: 'John Doe' })
   @IsString()
   @IsNotEmpty()
   @MaxLength(50)
   @Transform(({ value }) => value?.trim())
   username!: string
 
   @ApiProperty({ example: 'johndoe@example.com' })
   @IsEmail({}, { message: 'Format email tidak valid' })
   @IsNotEmpty()
   @Transform(({ value }) => value?.toLowerCase().trim())
   email!: string
 
   @ApiProperty({ example: 'password123' })
   @IsString()
   @IsNotEmpty()
   @MinLength(8, { message: 'Password minimal 8 karakter' })
   password!: string
 
}