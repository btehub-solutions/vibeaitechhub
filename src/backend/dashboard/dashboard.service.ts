import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class DashboardService {
  async getStats(userId: string) {
    // Basic stats
    const modulesEnrolled = await prisma.enrollment.count({
      where: { userId }
    });

    // Mock "Hours Learned" or calculate from userProgress * lesson.duration
    // For now, simple mock or count
    const hoursLearned = 12; // Placeholder or calculate

    const lessonsComplete = await prisma.userProgress.count({
      where: { userId, completed: true }
    });

    return {
      modules_enrolled: modulesEnrolled,
      hours_learned: hoursLearned,
      lessons_complete: lessonsComplete
    };
  }

  async getActiveEnrollments(userId: string) {
    return prisma.enrollment.findMany({
      where: { userId },
      include: {
         course: {
            include: {
                modules: {
                    include: {
                        lessons: true
                    }
                }
            }
         }
      }
    }).then(enrollments => enrollments.map(e => ({
        id: e.id,
        program: {
            title: e.course.title,
            modules: e.course.modules
        },
        progress: e.progress
    })));
  }
}

export const dashboardService = new DashboardService();
