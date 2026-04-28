import {
   IsOptional,
   IsString,
   MinLength,
   MaxLength,
 } from 'class-validator'
 import { ApiPropertyOptional } from '@nestjs/swagger'
 import { Transform } from 'class-transformer'
 
 export class UpdateThreadDto {
   @ApiPropertyOptional({
     example: 'Updated thread title',
   })
   @IsOptional()
   @IsString()
   @MinLength(5, { message: 'Title minimal 5 karakter' })
   @MaxLength(100, { message: 'Title maksimal 100 karakter' })
   @Transform(({ value }) => value?.trim())
   title?: string
 
   @ApiPropertyOptional({
     example: 'Updated thread content...',
   })
   @IsOptional()
   @IsString()
   @MinLength(10, { message: 'Content minimal 10 karakter' })
   @MaxLength(5000, { message: 'Content maksimal 5000 karakter' })
   @Transform(({ value }) => value?.trim())
   content?: string
}