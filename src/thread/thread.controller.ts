import {
   Body,
   Controller,
   Delete,
   Get,
   Param,
   Post,
   Put,
   Req,
   UseGuards,
 } from '@nestjs/common'
 import { ThreadService } from './thread.service'
 import { CreateThreadDto } from './dto/create-thread.dto'
 import { UpdateThreadDto } from './dto/update-thread.dto'
 import { JwtAuthGuard } from '../auth/jwt.guard'
 
 @Controller('api/threads')
 export class ThreadController {
   constructor(private threadService: ThreadService) {}
 
   @Post()
   @UseGuards(JwtAuthGuard)
   create(@Req() req, @Body() dto: CreateThreadDto) {
     return this.threadService.create(req.user.userId, dto)
   }
 
   @Get()
   findAll() {
     return this.threadService.findAll()
   }
 
   @Get('my-threads')
   @UseGuards(JwtAuthGuard)
   findMyThreads(@Req() req) {
     return this.threadService.findMyThreads(req.user.userId)
   }
 
   @Get(':id')
   findOne(@Param('id') id: string) {
     return this.threadService.findOne(id)
   }
 
   @Put(':id')
   @UseGuards(JwtAuthGuard)
   update(@Req() req, @Param('id') id: string, @Body() dto: UpdateThreadDto) {
     return this.threadService.update(req.user.id, id, dto)
   }
 
   @Delete(':id')
   @UseGuards(JwtAuthGuard)
   remove(@Req() req, @Param('id') id: string) {
     return this.threadService.remove(req.user.id, id)
   }
 }