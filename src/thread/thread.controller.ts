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
   async create(@Req() req, @Body() dto: CreateThreadDto) {
     return this.threadService.create(req.user.userId, dto)
   }
 
   @Get()
   async findAll() {
     return this.threadService.findAll()
   }
 
   @Get('my-threads')
   @UseGuards(JwtAuthGuard)
   async findMyThreads(@Req() req) {
      return await this.threadService.findMyThreads(req.user.userId)
   } 
 
   @Get(':id')
   async findOne(@Param('id') id: string) {
      return await this.threadService.findOne(id)
      
   }
 
   @Put(':id')
   @UseGuards(JwtAuthGuard)
   async update(
      @Req() req, 
      @Param('id') id: string, 
      @Body() dto: UpdateThreadDto
   ) {
      const updatedThread = await this.threadService.update(req.user.userId, id, dto);

      return {
         success: true,
         message: 'Thread updated successfully',
         data: updatedThread
      }
     
   }
 
   @Delete(':id')
   @UseGuards(JwtAuthGuard)
   async remove(@Req() req, @Param('id') id: string) {
     const deletedThread = await this.threadService.remove(req.user.userId, id);

     return {
       success: true,
       message: 'Thread deleted successfully',
       data: deletedThread // You can return the deleted thread data if needed, or just a success message
     };
   }
 }