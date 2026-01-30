import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { CreateNoteDto } from './dto/create-note-schema.dto';
import { PinoLogger } from 'nestjs-pino';
import { Note } from '../../prisma/generated/prisma/browser';
import { IdDto } from 'src/common/common-schemas.dto';

@Injectable()
export class NotesService {
  constructor(
    private prisma: PrismaService,
    private readonly logger: PinoLogger,
  ) {}
  async getAllNotes(): Promise<Note[]> {
    this.logger.info('Fetching all notes');
    const notes = await this.prisma.note.findMany();
    this.logger.info({ msg: 'Fetched notes', count: notes.length });
    return notes;
  }
  async createNote(dto: CreateNoteDto): Promise<Note> {
    this.logger.info({ msg: 'Creating a new note', title: dto.title });
    const note = await this.prisma.note.create({
      data: {
        title: dto.title,
        content: dto.content,
      },
    });
    this.logger.info({ msg: 'Created note', id: note.id });
    return note;
  }
  async deleteNote(dto: IdDto): Promise<Note> {
    this.logger.info({ msg: 'Deleting note', id: dto.id });
    const note = await this.prisma.note.delete({
      where: {
        id: dto.id,
      },
    });
    this.logger.info({ msg: 'Deleted note', id: note.id });
    return note;
  }
}
