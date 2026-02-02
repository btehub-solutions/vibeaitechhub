import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class CoursesService {
  async findAll() {
    return prisma.course.findMany({
      include: {
        modules: {
          include: { lessons: true }
        }
      }
    });
  }

  async findOne(slug: string) {
    return prisma.course.findUnique({
      where: { slug },
      include: {
        modules: {
          include: { lessons: true }
        }
      }
    });
  }
}

export const coursesService = new CoursesService();
