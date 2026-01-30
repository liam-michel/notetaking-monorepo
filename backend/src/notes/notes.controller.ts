import { Controller, Get, Post, Body } from '@nestjs/common';
import { NotesService } from './notes.service';
import type { CreateNoteDto } from './dto/create-note-schema.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  getAllNotes() {
    return this.notesService.getAllNotes();
  }
  @Post()
  createNote(@Body() dto: CreateNoteDto) {
    return this.notesService.createNote(dto);
  }
}
