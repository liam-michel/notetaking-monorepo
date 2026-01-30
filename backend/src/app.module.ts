import { Module } from '@nestjs/common';

import { NotesController } from './notes/notes.controller';
import { NotesService } from './notes/notes.service';
import { PrismaModule } from './prisma/prisma.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [PrismaModule, LoggerModule],
  controllers: [NotesController],
  providers: [NotesService],
})
export class AppModule {}
