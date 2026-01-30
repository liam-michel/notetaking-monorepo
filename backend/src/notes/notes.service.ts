import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { CreateNoteDto } from './dto/create-note-schema.dto';
import pino from '../../utils/pino';
@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}
  async getNotes() {
    pino.info('Fetching all notes');
    const notes = await this.prisma.note.findMany();
    return notes;
  }
  async createNote(dto: CreateNoteDto) {
    pino.info({ msg: 'Creating a new note', title: dto.title });
    const note = await this.prisma.note.create({
      data: {
        title: dto.title,
        content: dto.content,
      },
    });
    return note;
  }
}
