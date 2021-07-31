import { mockStore } from "../../test-utils/mockStore";
import { authActions } from "../authReducer";
import { notesActions } from "./notesReducer";

describe("Test on notes reducer", () => {
  let state = mockStore.getState();
  let dispatch = mockStore.dispatch;

  const note = {
    id: "test",
    title: "test",
    body: "test",
    date: 123565678,
    imageUrl: null,
  };

  beforeEach(() => {
    dispatch(authActions.login({ displayName: "Testing", uid: "TESTING" }));
    state = mockStore.getState();
  });

  afterEach(() => {
    dispatch(authActions.logout());
  });

  test("addNewNote should add a new note", () => {
    dispatch(notesActions.addNewNote(note));

    const {
      notesReducer: { notes },
    } = mockStore.getState();

    expect(notes.length).toBe(1);
    expect(notes[0]).toEqual(note);
  });

  test("setNoteActive should set a note active", () => {
    dispatch(notesActions.setNoteActive(note));

    const {
      notesReducer: { active },
    } = mockStore.getState();

    expect(active).not.toBe(null);
    expect(active).toEqual(note);
    expect("id" in active!).toBe(true);
  });

  test("updateNoteActive should update the current note active", () => {
    dispatch(notesActions.setNoteActive(note));
    dispatch(
      notesActions.updateNoteActive({
        title: "note updated",
        body: "note updated",
      })
    );

    const {
      notesReducer: { active },
    } = mockStore.getState();

    expect(active).not.toEqual(note);
    expect(active?.title).toBe("note updated");
    expect(active?.body).toBe("note updated");
  });

  test("setNotes should set the notes on notes:Note[]", () => {
    dispatch(
      notesActions.setNotes([
        { ...note, id: "test 1", body: "note 1" },
        { ...note, id: "test 2", body: "note 2" },
        { ...note, id: "test 3", body: "note 3" },
      ])
    );

    const {
      notesReducer: { notes },
    } = mockStore.getState();

    expect(notes.length).toBe(3);
    notes.forEach((note, i) => expect(note.body).toBe(`note ${i + 1}`));
  });

  test("refreshNote should update a note in notes:Note[]", () => {
    const noteUpdate = {
      id: "GV76gtb",
      title: "test updated",
      body: "test updated",
      date: 123565678,
      imageUrl: null,
    };

    dispatch(
      notesActions.setNotes([
        { ...note, id: "test 1" },
        { ...note, id: "GV76gtb" },
        { ...note, id: "test 3" },
      ])
    );
    dispatch(notesActions.refreshNote(noteUpdate));

    const {
      notesReducer: { notes },
    } = mockStore.getState();

    const noteExpect = notes.find((note) => note.id === noteUpdate.id);

    expect(noteExpect).toEqual(noteUpdate);
    expect(noteExpect?.title).toBe("test updated");
    expect(noteExpect?.body).toBe("test updated");
  });

  test("deleteNote should delete a note in notes:Note[]", () => {
    dispatch(
      notesActions.setNotes([
        { ...note, id: "test 1", body: "note 1" },
        { ...note, id: "test 2", body: "note 2" },
        { ...note, id: "test 3", body: "note 3" },
      ])
    );

    state = mockStore.getState();
    expect(state.notesReducer.notes.length).toBe(3);

    dispatch(notesActions.deleteNote("test 2"));

    state = mockStore.getState();
    expect(state.notesReducer.notes.length).toBe(2);
  });

  test("notesLogoutCleaning should remove all notes in notes:Notes[] and set active to null", () => {
    dispatch(
      notesActions.setNotes([
        { ...note, id: "test 1", body: "note 1" },
        { ...note, id: "test 2", body: "note 2" },
        { ...note, id: "test 3", body: "note 3" },
      ])
    );
    state = mockStore.getState();

    dispatch(notesActions.setNoteActive(state.notesReducer.notes[1]));
    state = mockStore.getState();

    expect(state.notesReducer.notes.length).toBe(3);
    expect(state.notesReducer.active?.id).toBe("test 2");

    dispatch(notesActions.notesLogoutCleaning());
    state = mockStore.getState();

    expect(state.notesReducer.notes.length).toBe(0);
    expect(state.notesReducer.active).toBeNull();
  });
});
