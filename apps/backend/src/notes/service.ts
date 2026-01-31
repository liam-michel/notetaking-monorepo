import { createNotesStorage } from './storage.js';
import type { Storage } from './storage.js';
import type {
  NoteCreateInput,
  IdInput,
  PaginationInput,
} from '../common/schemas.js';
import { Note } from '@prisma/client';

export type NotesService = {
  getAllNotes: () => ReturnType<Storage['notes']['getAllNotes']>;
  createNote: (
    data: NoteCreateInput,
  ) => ReturnType<Storage['notes']['createNote']>;
  deleteNote: (data: IdInput) => ReturnType<Storage['notes']['deleteNote']>;
  getNotesPaginated: (
    data: PaginationInput,
  ) => ReturnType<Storage['notes']['getNotesPaginated']>;
};

function getAllNotes(storage: Storage) {
  return async function (): Promise<Note[]> {
    return await storage.notes.getAllNotes();
  };
}

function createNote(storage: Storage) {
  return async function (data: NoteCreateInput) {
    const note = await storage.notes.createNote(data);
    // future business logic here
    return note; // TypeScript infers Promise<Note>
  };
}

function getNotesPaginated(storage: Storage) {
  return async function (data: PaginationInput) {
    const notes = await storage.notes.getNotesPaginated(data);
    // future business logic here
    return notes;
  };
}

function deleteNote(storage: Storage) {
  return async function (data: IdInput): Promise<string> {
    return await storage.notes.deleteNote(data);
  };
}

export async function createNotesService(deps: Storage): Promise<NotesService> {
  const storage = deps;

  return {
    getAllNotes: getAllNotes(storage),
    createNote: createNote(storage),
    deleteNote: deleteNote(storage),
    getNotesPaginated: getNotesPaginated(storage),
  };
}
