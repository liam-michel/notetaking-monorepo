import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import pino from '../../utils/pino';
@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}
  async getNotes() {
    pino.info('Fetching all notes');
    const notes = await this.prisma.note.findMany();
    return notes;
  }
}
