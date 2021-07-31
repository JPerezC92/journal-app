/**
 * @jest-environment node
 */
import { db } from "../firebase";
import { NotesService } from "./NotesService";

enum Test {
  ONE = `TESTING_ONE`,
  TWO = `TESTING_TWO`,
  THREE = `TESTING_THREE`,
  FOUR = `TESTING_FOUR`,
  FIVE = `TESTING_FIVE`,
}

describe("Test  on NotesService", () => {
  const testNote = {
    title: "testing",
    body: "test",
    imageUrl: null,
  };

  beforeEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test("create should create a new note", async () => {
    const note = await NotesService.create(Test.ONE, testNote);

    expect(note).toEqual({
      body: "test",
      date: expect.any(Number),
      id: expect.any(String),
      imageUrl: null,
      title: "testing",
    });

    await db.doc(`${Test.ONE}/journal/notes/${note.id}`).delete();
  });

  test("getAll should return an array of notes", async () => {
    jest.spyOn(db, "collection");
    const notes = await NotesService.getAll(Test.TWO);
    const noteMock = {
      id: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number),
      imageUrl: null,
      title: expect.any(String),
    };

    expect(notes).toEqual([noteMock, noteMock, noteMock]);
    expect(db.collection).toHaveBeenCalledWith(`${Test.TWO}/journal/notes`);
  });

  test("update should update a note", async () => {
    const note = await NotesService.create(Test.THREE, testNote);

    expect(note).toEqual({
      body: "test",
      date: expect.any(Number),
      id: expect.any(String),
      imageUrl: null,
      title: "testing",
    });

    await NotesService.update(Test.THREE, {
      ...note,
      body: "Note updated successfully",
    });

    const notes = await NotesService.getAll(Test.THREE);
    expect(notes[0].body).toBe("Note updated successfully");
    await db.doc(`${Test.THREE}/journal/notes/${notes[0].id}`).delete();
  });

  test("delete should delete a note", async () => {
    jest.spyOn(db, "doc");
    const note = await NotesService.create(Test.FOUR, testNote);

    expect(note).toEqual({
      body: "test",
      date: expect.any(Number),
      id: expect.any(String),
      imageUrl: null,
      title: "testing",
    });
    await NotesService.delete(Test.FOUR, note.id);

    const notes = await NotesService.getAll(Test.FOUR);

    expect(notes.length).toBe(0);
    expect(db.doc).toHaveBeenCalledTimes(1);
    expect(db.doc).toHaveBeenCalledWith(
      `${Test.FOUR}/journal/notes/${note.id}`
    );
  });
});
