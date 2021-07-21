import { createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { db } from "../../firebase";
import { NotesService } from "../../services";
import { UploadService } from "../../services/UploadService";
import { RootState } from "../../store/store";
import { Note, notesActions } from "./notesReducer";

enum NotesThunks {
  START_NEW_NOTE = "START_NEW_NOTE",
  START_LOADING_NOTES = "START_LOADING_NOTES",
  START_SAVE_NOTE = "START_SAVE_NOTE",
  START_UPLOADING_IMG = "START_UPLOADING_IMG",
  START_DELETE_NOTE = "START_DELETE_NOTE",
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

export const startSaveNote = createAsyncThunk<void, Note>(
  NotesThunks.START_SAVE_NOTE,
  async (note, { dispatch, getState }) => {
    const { user } = (getState() as RootState).authReducer;

    await NotesService.update(user.uid, note);

    dispatch(notesActions.refreshNote(note));
    Swal.fire("Saved", note.title, "success");
  }
);

export const startUploadingImg = createAsyncThunk<void, File>(
  NotesThunks.START_UPLOADING_IMG,
  async (file, { dispatch, getState }) => {
    const note = (getState() as RootState).notesReducer.active!;

    Swal.fire({
      title: "uploading...",
      text: "Please wait...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const fileUrl = await UploadService.image(file);

    Swal.close();
    if (fileUrl) dispatch(startSaveNote({ ...note, imageUrl: fileUrl }));
  }
);

export const startDeleteNote = createAsyncThunk<void, string>(
  NotesThunks.START_DELETE_NOTE,
  async (noteId, { dispatch, getState }) => {
    const { user } = (getState() as RootState).authReducer;

    await NotesService.delete(user.uid, noteId);

    dispatch(notesActions.deleteNote(noteId));
  }
);
