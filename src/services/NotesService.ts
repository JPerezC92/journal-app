import { db } from "../firebase";
import { Note } from "../reducers";

export class NotesService {
  static async getAll(uid: string): Promise<Note[]> {
    const notesSnap = await db
      .collection(`${uid}/journal/notes`)
      .orderBy("date")
      .get();
    const notes: Note[] = notesSnap.docs.map(
      (doc) =>
        ({
          ...doc.data(),
          id: doc.id,
        } as Note)
    );

    return notes;
  }

  static async create(
    uid: string,
    note: Omit<Note, "id" | "date">
  ): Promise<Note> {
    try {
      const docRef = await db.collection(`${uid}/journal/notes`).add({
        ...note,
        date: new Date().getTime(),
      });

      await docRef.update({ id: docRef.id });

      const noteSaved = (await docRef.get()).data() as Note;
      return noteSaved;
    } catch (error) {
      console.log(error);
      throw new Error("Create note failed");
    }
  }

  static async update(uid: string, note: Note) {
    await db.doc(`${uid}/journal/notes/${note.id}`).update(note);
  }

  static async delete(uid: string, noteId: string) {
    await db.doc(`${uid}/journal/notes/${noteId}`).delete();
  }
}
