import renderer from "react-test-renderer";
import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { Note, notesActions } from "../../reducers";
import { mockStore } from "../../test-utils/mockStore";
import { store } from "../../store/store";
import * as notesThunks from "../../reducers/notesReducer/notesThunks";
import NoteScreen from "./NoteScreen";

describe("Test on <NotesScreen />", () => {
  const noteMock: Note = {
    id: "1",
    title: "Test title",
    body: "Test body",
    date: new Date().getDate(),
    imageUrl:
      "https://res.cloudinary.com/jperezc92/image/upload/v1627759301/ezxhoydkvqaidpcf6loq.png",
  };

  beforeEach(() => {
    jest.restoreAllMocks();
    cleanup();
    mockStore.dispatch(notesActions.setNoteActive(noteMock));
  });

  test("should match the snapshot correctly", () => {
    store.dispatch(notesActions.setNoteActive(noteMock));

    const tree = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <NoteScreen />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("should call updateNoteActive", () => {
    jest.spyOn(notesActions, "updateNoteActive");

    const component = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <NoteScreen />
        </MemoryRouter>
      </Provider>
    );

    const titleInput = component.getByPlaceholderText("Some awesome title");

    act(() => {
      fireEvent.change(titleInput, {
        target: { value: "Testing change title" },
      });
    });

    expect(titleInput).toHaveValue("Testing change title");
    expect(notesActions.updateNoteActive).toHaveBeenCalledTimes(2);
    expect(notesActions.updateNoteActive).toHaveBeenCalledWith({
      body: "Test body",
      title: "Test title",
    });
    expect(notesActions.updateNoteActive).toHaveBeenLastCalledWith({
      body: "Test body",
      title: "Testing change title",
    });
  });

  test("should call startDeleteNote", () => {
    jest.spyOn(notesThunks, "startDeleteNote");

    const component = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <NoteScreen />
        </MemoryRouter>
      </Provider>
    );

    const deleteButton = component.getByText("Delete");

    act(() => {
      fireEvent.click(deleteButton);
    });

    expect(notesThunks.startDeleteNote).toHaveBeenCalledTimes(1);
    expect(notesThunks.startDeleteNote).toHaveBeenCalledWith("1");
  });
});
