import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Note {
  id: string;
  title: string;
  body: string;
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
    setNoteActive: (state, action: PayloadAction<Partial<Note>>) => {
      state.active = { ...state.active!, ...action.payload };
    },
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    },
    refreshNote: (state, { payload }: PayloadAction<Note>) => {
      state.notes = state.notes.map((note) =>
        note.id === payload.id ? payload : note
      );
    },
    notesFileUrl: (params) => {},
    notesDelete: (params) => {},
    notesLogoutCleaning: (params) => {},
  },
});

export const notesActions = notesSlice.actions;

export const notesReducer = notesSlice.reducer;
