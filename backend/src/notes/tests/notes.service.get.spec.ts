import { Test, TestingModule } from '@nestjs/testing';
import { PinoLogger } from 'nestjs-pino';
import { Note } from '../../../prisma/generated/prisma/client';
// Mock the Prisma client BEFORE importing PrismaService
jest.mock('../../../prisma/generated/prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    $connect: jest.fn(),
    $disconnect: jest.fn(),
    note: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  })),
}));

// Now safe to import
import { NotesService } from '../notes.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('NotesService', () => {
  let service: NotesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesService,
        PrismaService,
        {
          provide: PinoLogger,
          useValue: {
            info: jest.fn(),
            error: jest.fn(),
            warn: jest.fn(),
            debug: jest.fn(),
            setContext: jest.fn(),
            child: jest.fn().mockReturnThis(),
          },
        },
      ],
    }).compile();

    service = module.get<NotesService>(NotesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should return many notes', async () => {
    const mockNotes: Note[] = [
      {
        id: '1',
        title: 'Note 1',
        content: 'Content 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        title: 'Note 2',
        content: 'Content 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const findManySpy = jest
      .spyOn(prisma.note, 'findMany')
      .mockResolvedValue(mockNotes);

    const notes = await service.getAllNotes();

    expect(notes).toEqual(mockNotes);
    expect(findManySpy).toHaveBeenCalled();
  });
  it('should return one note if only one note is present', async () => {
    const mockNotes: Note[] = [
      {
        id: '1',
        title: 'Note 1',
        content: 'Content 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const findManySpy = jest
      .spyOn(prisma.note, 'findMany')
      .mockResolvedValue(mockNotes);

    const notes = await service.getAllNotes();

    expect(notes).toEqual(mockNotes);
    expect(findManySpy).toHaveBeenCalled();
  });
  it('should allow for no notes to be present', async () => {
    const mockNotes: Note[] = [];

    const findManySpy = jest
      .spyOn(prisma.note, 'findMany')
      .mockResolvedValue(mockNotes);

    const notes = await service.getAllNotes();

    expect(notes).toEqual(mockNotes);
    expect(findManySpy).toHaveBeenCalled();
  });
});
