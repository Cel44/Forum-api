import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { Injectable, OnModuleInit } from '@nestjs/common'
import 'dotenv/config'

const adapter = new PrismaBetterSqlite3({
  url: 'file:./dev.db',
})

const prisma = new PrismaClient({
  adapter,
})

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({ adapter })
  }

  async onModuleInit() {
    await this.$connect()
  }
}