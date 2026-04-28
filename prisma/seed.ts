import { PrismaBetterSqlite3 } from 'node_modules/@prisma/adapter-better-sqlite3/dist/index.mjs'
import { PrismaClient } from '../src/generated/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient({
   adapter: new PrismaBetterSqlite3({
     url: 'file:./dev.db',
   })
})

const USERS = [
  {
    id: 'U001',
    name: 'johndoe',
    email: 'johndoe@example.com',
    password_hash: '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjIQG8.RMG',
    createdAt: '2026-04-20T10:00:00Z',
  },
  {
    id: 'U002',
    name: 'janedoe',
    email: 'jane@example.com',
    password_hash: '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjIQG8.RMG',
    createdAt: '2026-04-21T14:30:00Z',
  },
]

const THREADS = [
  {
    id: 'T101',
    user_id: 'U001',
    title: 'How do I set up environment variables in Node.js?',
    content:
      'I am new to backend development and confused about how to hide my API keys. Could someone explain how to use dotenv?',
    createdAt: '2026-04-22T08:15:00Z',
    updatedAt: '2026-04-22T08:15:00Z',
  },
  {
    id: 'T102',
    user_id: 'U002',
    title: 'When should I use PostgreSQL vs MongoDB?',
    content:
      'For a medium-scale e-commerce project, which database is more recommended and why?',
    createdAt: '2026-04-22T09:45:00Z',
    updatedAt: '2026-04-22T10:00:00Z',
  },
  {
    id: 'T103',
    user_id: 'U001',
    title: 'Getting a CORS error when hitting the API from React',
    content:
      "I keep getting an 'Access-Control-Allow-Origin' error. How do I handle this on the Express.js side?",
    createdAt: '2026-04-22T11:20:00Z',
    updatedAt: '2026-04-22T11:20:00Z',
  },
]

async function main() {
  console.log('🧹 Cleaning database...')

  await prisma.thread.deleteMany()
  await prisma.user.deleteMany()

  console.log('👤 Seeding users...')

  const users = await Promise.all(
    USERS.map(async (u) => {
      return prisma.user.create({
        data: {
          id: u.id,
          name: u.name,
          email: u.email,
          password_hash: await bcrypt.hash('password123', 10),
          createdAt: new Date(u.createdAt),
        },
      })
    }),
  )

  console.log('Seeding threads...')

  for (const t of THREADS) {
    await prisma.thread.create({
      data: {
        id: t.id,
        title: t.title,
        content: t.content,
        userId: t.user_id,
        createdAt: new Date(t.createdAt),
        updatedAt: new Date(t.updatedAt),
      },
    })
  }

  console.log('✅ Seed complete')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())