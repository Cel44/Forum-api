import {
   IsNotEmpty,
   IsString,
   MinLength,
   MaxLength,
 } from 'class-validator'
 import { ApiProperty } from '@nestjs/swagger'
 import { Transform } from 'class-transformer'
 
 export class CreateThreadDto {
   @ApiProperty({
     example: 'How to fix Prisma error in NestJS?',
   })
   @IsString()
   @IsNotEmpty({ message: 'Title tidak boleh kosong' })
   @MinLength(5, { message: 'Title minimal 5 karakter' })
   @MaxLength(100, { message: 'Title maksimal 100 karakter' })
   @Transform(({ value }) => value?.trim())
   title!: string
 
   @ApiProperty({
     example: 'I keep getting PrismaClientInitializationError...',
   })
   @IsString()
   @IsNotEmpty({ message: 'Content tidak boleh kosong' })
   @MinLength(10, { message: 'Content minimal 10 karakter' })
   @MaxLength(5000, { message: 'Content maksimal 5000 karakter' })
   @Transform(({ value }) => value?.trim())
   content!: string
 }