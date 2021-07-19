import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Note {
  id: string | null;
  title: string | null;
  body: string | null;
  imageUrl: string | null;
  date: number;
}

interface NotesState {
  notes: Note[];
  active: Note | null;
}
const initialState: NotesState = { notes: [], active: null };

const notesSlice = createSlice({
  name: "[NOTES]",
  initialState,
  reducers: {
    notesAddNew: (params) => {},
    setNoteActive: (
      state,
      action: PayloadAction<{ id: string; note: Note }>
    ) => {
      state.active = action.payload.note;
    },
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    },
    notesUpdated: (params) => {},
    notesFileUrl: (params) => {},
    notesDelete: (params) => {},
    notesLogoutCleaning: (params) => {},
  },
});

export const notesActions = notesSlice.actions;

export const notesReducer = notesSlice.reducer;
