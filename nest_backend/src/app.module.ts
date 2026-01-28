import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { ProgramsModule } from './programs/programs.module';
import { ModulesModule } from './modules/modules.module';
import { LessonsModule } from './lessons/lessons.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [AuthModule, ProgramsModule, ModulesModule, LessonsModule, EventsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
