/**
 * @jest-environment node
 */
import Swal from "sweetalert2";
import { NotesService } from "../../services";
import { store } from "../../store/store";
import { authActions, startLogout } from "../authReducer";
import {
  startDeleteNote,
  startLoadingNotes,
  startNewNote,
  startSaveNote,
} from "./notesThunks";

describe("Test on notesThunks startNewNote, startLoadingNotes, startSaveNote", () => {
  Swal.fire = jest.fn();

  let dispatch = store.dispatch;
  let state = store.getState();

  beforeEach(() => {
    dispatch(authActions.login({ displayName: "Test", uid: "TESTING" }));
    dispatch = store.dispatch;
    state = store.getState();
  });

  afterEach(async () => {
    await dispatch(startLogout());
  });

  test("startNewNote should create a new note", async () => {
    await dispatch(startNewNote());

    state = store.getState();

    expect(state.notesReducer.active).toEqual({
      body: "",
      date: expect.any(Number),
      id: expect.any(String),
      imageUrl: null,
      title: "",
    });

    expect(state.notesReducer.notes.length).toBe(1);

    await NotesService.delete("TESTING", state.notesReducer.active?.id!);
  });

  test("startLoadingNotes should load all the user notes", async () => {
    await dispatch(startLoadingNotes(state.authReducer.user.uid));
    state = store.getState();

    const note = {
      body: expect.any(String),
      date: expect.any(Number),
      id: expect.any(String),
      imageUrl: null,
      title: expect.any(String),
    };

    expect(state.notesReducer.notes.length).toBe(3);
    expect(state.notesReducer.notes).toEqual([note, note, note]);
  });

  test("startSaveNote should update the note", async () => {
    const noteOriginal = {
      title: "",
      date: 1626989415067,
      id: "fhq4yrzQtGiOy7RihsUE",
      body: "",
      imageUrl: null,
    };
    const noteUpdate = {
      title: "Testing note Update",
      date: 1626989415067,
      id: "fhq4yrzQtGiOy7RihsUE",
      body: "Testing note Update",
      imageUrl: null,
    };
    await dispatch(startLoadingNotes(state.authReducer.user.uid));
    await dispatch(startSaveNote(noteUpdate));
    state = store.getState();

    const note = state.notesReducer.notes.find(
      (note) => note.id === noteOriginal.id
    );

    expect(note).toEqual(noteUpdate);
    expect(note?.title).toBe("Testing note Update");
    expect(note?.body).toBe("Testing note Update");
    expect(Swal.fire).toHaveBeenCalledWith(
      "Saved",
      "Testing note Update",
      "success"
    );

    await dispatch(startSaveNote(noteOriginal));
  });

  test("startDeleteNote should delete a note", async () => {
    await dispatch(startNewNote());
    state = store.getState();

    expect(state.notesReducer.notes.length).toBe(1);
    expect(state.notesReducer.notes[0].id).toBe(state.notesReducer.active?.id);
    expect(state.notesReducer.active).toEqual({
      body: expect.any(String),
      date: expect.any(Number),
      id: expect.any(String),
      imageUrl: null,
      title: expect.any(String),
    });

    await dispatch(startDeleteNote(state.notesReducer.active?.id!));
    state = store.getState();

    expect(state.notesReducer.active).toBe(null);
  });
});
