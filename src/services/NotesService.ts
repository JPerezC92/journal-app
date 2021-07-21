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

  static async update(uid: string, note: Note) {
    await db.doc(`${uid}/journal/notes/${note.id}`).update(note);
  }

  static async delete(uid: string, noteId: string) {
    await db.doc(`${uid}/journal/notes/${noteId}`).delete();
  }
}
