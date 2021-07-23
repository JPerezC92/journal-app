import { createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { db } from "../../firebase";
import { NotesService, UploadService } from "../../services";
import { RootState } from "../../store/store";
import { Types } from "../../types/types";
import { Note, notesActions } from "./notesReducer";

export const startNewNote = createAsyncThunk(
  Types.NOTES_START_NEW_NOTE,
  async (_, { dispatch, getState }) => {
    const { uid } = (getState() as RootState).authReducer.user;
    const newNote: Omit<Note, "id"> = {
      title: "",
      body: "",
      date: new Date().getTime(),
      imageUrl: null,
    };

    const docRef = await db.collection(`${uid}/journal/notes`).add(newNote);
    await docRef.update({ id: docRef.id });

    dispatch(notesActions.setNoteActive({ ...newNote, id: docRef.id }));
    dispatch(notesActions.addNewNote({ ...newNote, id: docRef.id }));
  }
);

export const startLoadingNotes = createAsyncThunk<void, string>(
  Types.NOTES_START_LOADING_NOTES,
  async (uid, { dispatch }) => {
    const notes = await NotesService.getAll(uid);
    dispatch(notesActions.setNotes(notes));
  }
);

export const startSaveNote = createAsyncThunk<void, Note>(
  Types.NOTES_START_SAVE_NOTE,
  async (note, { dispatch, getState }) => {
    const { user } = (getState() as RootState).authReducer;

    await NotesService.update(user.uid, note);

    dispatch(notesActions.refreshNote(note));
    Swal.fire("Saved", note.title, "success");
  }
);

export const startUploadingImg = createAsyncThunk<void, File>(
  Types.NOTES_START_UPLOADING_IMG,
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
    if (fileUrl) await dispatch(startSaveNote({ ...note, imageUrl: fileUrl }));
  }
);

export const startDeleteNote = createAsyncThunk<void, string>(
  Types.NOTES_START_DELETE_NOTE,
  async (noteId, { dispatch, getState }) => {
    const { user } = (getState() as RootState).authReducer;

    await NotesService.delete(user.uid, noteId);

    dispatch(notesActions.deleteNote(noteId));
  }
);
