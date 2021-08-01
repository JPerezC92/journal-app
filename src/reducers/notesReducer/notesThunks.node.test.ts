/**
 * @jest-environment node
 */
import Swal from "sweetalert2";
import { NotesService } from "../../services";
import { mockStore, storeCleanActions } from "../../test-utils/mockStore";
import { authActions } from "../authReducer";
import { notesActions } from "./notesReducer";
import {
  startDeleteNote,
  startLoadingNotes,
  startNewNote,
  startSaveNote,
} from "./notesThunks";

describe("Test on notesThunks startNewNote, startLoadingNotes, startSaveNote", () => {
  Swal.fire = jest.fn();

  let dispatch = mockStore.dispatch;
  let state = mockStore.getState();
  const noteMock = {
    body: "",
    date: new Date().getTime(),
    id: "jsdkllhf378das",
    imageUrl: null,
    title: "",
  };

  beforeEach(() => {
    jest.restoreAllMocks();
    dispatch = mockStore.dispatch;

    // mock User
    dispatch(authActions.login({ displayName: "Test", uid: "TESTING" }));

    state = mockStore.getState();
  });

  afterEach(async () => {
    dispatch(storeCleanActions.clean());
  });

  test("startNewNote should create a new note", async () => {
    jest.spyOn(NotesService, "create").mockResolvedValue(noteMock);
    jest.spyOn(notesActions, "setNoteActive");
    jest.spyOn(notesActions, "addNewNote");

    await dispatch(startNewNote());

    state = mockStore.getState();

    expect(state.notesReducer.active).toEqual({
      ...noteMock,
      date: expect.any(Number),
    });
    expect(NotesService.create).toHaveBeenCalledTimes(1);
    expect(NotesService.create).toHaveBeenCalledWith("TESTING", {
      body: "",
      imageUrl: null,
      title: "",
    });
    expect(state.notesReducer.notes.length).toBe(1);
    expect(notesActions.setNoteActive).toHaveBeenCalledTimes(1);
    expect(notesActions.setNoteActive).toHaveBeenCalledWith({
      ...noteMock,
      date: expect.any(Number),
    });
    expect(notesActions.addNewNote).toHaveBeenCalledTimes(1);
    expect(notesActions.addNewNote).toHaveBeenCalledWith({
      ...noteMock,
      date: expect.any(Number),
    });
  });

  test("startLoadingNotes should load all the user notes", async () => {
    jest
      .spyOn(NotesService, "getAll")
      .mockResolvedValue([noteMock, noteMock, noteMock]);

    await dispatch(startLoadingNotes(state.authReducer.user.uid));
    state = mockStore.getState();

    expect(NotesService.getAll).toHaveBeenCalledTimes(1);
    expect(NotesService.getAll).toHaveBeenCalledWith("TESTING");
    expect(state.notesReducer.notes.length).toBe(3);
  });

  test("startSaveNote should update the note", async () => {
    jest.spyOn(NotesService, "update").mockResolvedValue();
    jest.spyOn(notesActions, "refreshNote");

    const noteUpdate = {
      title: "Testing note Update",
      date: 1626989415067,
      id: "fhq4yrzQtGiOy7RihsUE",
      body: "Testing note Update",
      imageUrl: null,
    };
    await dispatch(startSaveNote(noteUpdate));
    state = mockStore.getState();

    const { active, notes } = state.notesReducer;

    expect(NotesService.update).toHaveBeenCalledTimes(1);
    expect(NotesService.update).toHaveBeenCalledWith("TESTING", noteUpdate);
    expect(notesActions.refreshNote).toHaveBeenCalled();
    expect(notesActions.refreshNote).toHaveBeenCalledWith(noteUpdate);
    expect(active).toEqual(noteUpdate);
    expect(notes[0].title).toBe("Testing note Update");
    expect(notes[0].body).toBe("Testing note Update");
    expect(Swal.fire).toHaveBeenCalledWith(
      "Saved",
      "Testing note Update",
      "success"
    );
  });

  test("startDeleteNote should delete a note", async () => {
    jest.spyOn(NotesService, "delete").mockResolvedValue(Promise.resolve());
    jest.spyOn(notesActions, "deleteNote");

    // setting the note state
    dispatch(notesActions.refreshNote(noteMock));

    await dispatch(startDeleteNote(noteMock.id));

    state = mockStore.getState();

    expect(NotesService.delete).toHaveBeenCalledTimes(1);
    expect(NotesService.delete).toHaveBeenCalledWith(
      "TESTING",
      "jsdkllhf378das"
    );
    expect(notesActions.deleteNote).toHaveBeenCalledTimes(1);
    expect(notesActions.deleteNote).toHaveBeenCalledWith("jsdkllhf378das");
    expect(state.notesReducer.active).toBe(null);
  });
});
