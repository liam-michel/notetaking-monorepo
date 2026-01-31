import { Note, type PrismaClient } from '@prisma/client';
import { prisma } from '../utils/prisma.js';

import {
  IdInput,
  NoteCreateInput,
  PaginationInput,
} from '../common/schemas.js';

type DbClient = Pick<PrismaClient, 'note'>;
export type NotesMethods = {
  getAllNotes: () => Promise<Note[]>;
  createNote: (data: NoteCreateInput) => Promise<Note>;
  deleteNote: (data: IdInput) => Promise<string>;
  getNotesPaginated: (data: PaginationInput) => Promise<Note[]>;
};

export type Storage = Readonly<{
  notes: NotesMethods;
  transaction: <T>(
    callback: (repo: Readonly<Omit<Storage, 'transaction'>>) => Promise<T>,
  ) => Promise<T>;
}>;

function getAllNotes(db: DbClient) {
  return async function (): Promise<Note[]> {
    return db.note.findMany();
  };
}

function createNote(db: DbClient) {
  return async function (data: NoteCreateInput): Promise<Note> {
    return db.note.create({
      data,
    });
  };
}

function deleteNote(db: DbClient) {
  return async function (data: IdInput): Promise<string> {
    await db.note.delete({
      where: { id: data.id },
    });
    return data.id;
  };
}

function getNotesPaginated(db: DbClient) {
  return async function (data: PaginationInput): Promise<Note[]> {
    const skip = (data.page - 1) * data.limit;
    const take = data.limit;

    return db.note.findMany({
      skip,
      take,
    });
  };
}

function wrapDb(db: DbClient): Omit<Storage, 'transaction'> {
  return {
    notes: {
      getAllNotes: getAllNotes(db),
      createNote: createNote(db),
      deleteNote: deleteNote(db),
      getNotesPaginated: getNotesPaginated(db),
    },
  };
}

export async function createNotesStorage(): Promise<Storage> {
  return {
    ...wrapDb(prisma),
    async transaction(callback) {
      return prisma.$transaction(async (tx) => {
        const repo = wrapDb(tx);
        return callback(repo);
      });
    },
  };
}
