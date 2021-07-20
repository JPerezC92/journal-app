import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { NotesService } from "../../services";
import { RootState } from "../../store/store";
import { Note, notesActions } from "./notesReducer";

enum NotesThunks {
  START_NEW_NOTE = "START_NEW_NOTE",
  START_LOADING_NOTES = "START_LOADING_NOTES",
}

export const startNewNote = createAsyncThunk(
  NotesThunks.START_NEW_NOTE,
  async (_, { dispatch, getState }) => {
    const { uid } = (getState() as RootState).authReducer.user;
    const newNote: Omit<Note, "id"> = {
      title: "",
      body: "",
      date: new Date().getTime(),
      imageUrl: null,
    };

    const docRef = await db.collection(`${uid}/journal/notes`).add(newNote);
    docRef.update({ id: docRef.id });

    dispatch(notesActions.setNoteActive({ ...newNote, id: docRef.id }));
  }
);

export const startLoadingNotes = createAsyncThunk<void, string>(
  NotesThunks.START_LOADING_NOTES,
  async (uid, { dispatch }) => {
    const notes = await NotesService.getAll(uid);
    dispatch(notesActions.setNotes(notes));
  }
);
