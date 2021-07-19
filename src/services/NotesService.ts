import { db } from "../firebase";
import { Note } from "../reducers";

export class NotesService {
  static async getAll(uid: string): Promise<Note[]> {
    const notesSnap = await db.collection(`${uid}/journal/notes`).get();
    const notes: Note[] = notesSnap.docs.map(
      (doc) =>
        ({
          ...doc.data(),
          id: doc.id,
        } as Note)
    );

    return notes;
  }
}
