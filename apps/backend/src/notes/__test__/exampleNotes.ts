//export a factory function that returns 10 valid notes for testing purposes

export function createExampleNotes() {
  const notes = []
  for (let i = 1; i <= 10; i++) {
    notes.push({
      id: i.toString(),
      title: `Note ${i}`,
      content: `This is the content of note ${i}.`,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }
  return notes
}
