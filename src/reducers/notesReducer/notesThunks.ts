import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { RootState } from "../../store/store";
import { Note, notesActions } from "./notesReducer";

enum NotesThunks {
  START_NEW_NOTE = "START_NEW_NOTE",
}

export const startNewNote = createAsyncThunk(
  NotesThunks.START_NEW_NOTE,
  async (_, { dispatch, getState }) => {
    const { uid } = (getState() as RootState).authReducer.user;
    const newNote: Note = {
      id: null,
      title: "",
      body: "",
      date: new Date().getTime(),
      imageUrl: null,
    };

    const docRef = await db.collection(`${uid}/journal/notes`).add(newNote);

    dispatch(notesActions.setNoteActive({ id: docRef.id, note: newNote }));
  }
);
