import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10)

  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'Test Learner',
      password: hashedPassword,
      role: 'LEARNER'
    },
  })

  const course = await prisma.course.upsert({
    where: { slug: 'intro-to-ai' },
    update: {},
    create: {
      title: 'Introduction to AI',
      slug: 'intro-to-ai',
      description: 'Learn the basics of Artificial Intelligence.',
      thumbnail: 'https://placehold.co/600x400',
      modules: {
        create: {
          title: 'Module 1: Basics',
          order: 1,
          lessons: {
            create: [
              {
                title: 'What is AI?',
                order: 1,
                content: 'AI stands for Artificial Intelligence...',
                duration: 10
              }
            ]
          }
        }
      }
    },
  })

  // Enroll user in course
  await prisma.enrollment.upsert({
    where: {
      userId_courseId: {
        userId: user.id,
        courseId: course.id
      }
    },
    update: {},
    create: {
      userId: user.id,
      courseId: course.id,
      progress: 0
    }
  })

  console.log({ user, course })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
