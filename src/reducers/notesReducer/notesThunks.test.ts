import { NotesService } from "../../services";
import { store } from "../../store/store";
import { authActions } from "../authReducer";
import { startNewNote } from "./notesThunks";

describe("Test on notesThunks", () => {
  test("should create a new note", async () => {
    let state = store.getState();
    let dispatch = store.dispatch;

    dispatch(authActions.login({ displayName: "Test", uid: "TESTING" }));

    await dispatch(await startNewNote());

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
});
