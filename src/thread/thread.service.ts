import { Injectable, ForbiddenException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateThreadDto } from './dto/create-thread.dto'
import { UpdateThreadDto } from './dto/update-thread.dto'

@Injectable()
export class ThreadService {
  constructor(private prisma: PrismaService) {}

  create(userId: string, dto: CreateThreadDto) {
    return this.prisma.thread.create({
      data: {
        title: dto.title,
        content: dto.content,
        userId,
      },
    })
  }

  findAll() {
    return this.prisma.thread.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
  }

  findMyThreads(userId: string) {
    return this.prisma.thread.findMany({
      where: { userId },
    })
  }

  findOne(id: string) {
    return this.prisma.thread.findUnique({
      where: { id },
      include: {
        user: true,
      },
    })
  }

  async update(userId: string, id: string, dto: UpdateThreadDto) {
    const thread = await this.prisma.thread.findUnique({
      where: { id },
    })

    if (thread!.userId !== userId) {
      throw new ForbiddenException('Not your thread')
    }

    return this.prisma.thread.update({
      where: { id },
      data: dto,
    })
  }

  async remove(userId: string, id: string) {
    const thread = await this.prisma.thread.findUnique({
      where: { id },
    })

    if (thread!.userId !== userId) {
      throw new ForbiddenException('Not your thread')
    }

    return this.prisma.thread.delete({
      where: { id },
    })
  }
}