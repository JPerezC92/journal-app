import { act, fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { Note, notesActions } from "../../reducers";
import * as notesThunks from "../../reducers/notesReducer/notesThunks";
import { store } from "../../store/store";
import { mockStore } from "../../test-utils/mockStore";
import NotesAppBar from "./NotesAppBar";

const noteMock: Note = {
  id: "1",
  title: "Test title",
  body: "Test body",
  date: new Date().getDate(),
  imageUrl:
    "https://res.cloudinary.com/jperezc92/image/upload/v1627759301/ezxhoydkvqaidpcf6loq.png",
};

describe("Test on <NotesAppBar />", () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
    mockStore.dispatch(notesActions.setNoteActive(noteMock));
  });

  test("should match the snapshot correctly", () => {
    store.dispatch(notesActions.setNoteActive(noteMock));

    const tree = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <NotesAppBar />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("should call startSaveNote", () => {
    jest.spyOn(notesThunks, "startSaveNote");

    const component = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <NotesAppBar />
        </MemoryRouter>
      </Provider>
    );

    const saveButton = component.getByText("Save");

    act(() => {
      fireEvent.click(saveButton);
    });

    expect(notesThunks.startSaveNote).toHaveBeenCalledTimes(1);
    expect(notesThunks.startSaveNote).toHaveBeenCalledWith(noteMock);
  });

  test("should call startUploadingImg", () => {
    jest.spyOn(notesThunks, "startUploadingImg");

    const component = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <NotesAppBar />
        </MemoryRouter>
      </Provider>
    );

    const pictureButton = component.getByText("Picture");
    const fileInput = component.getByTestId("fileInput");

    const file = new File([], "foto.png");

    fireEvent.change(fileInput, { target: { files: [file] } });

    act(() => {
      fireEvent.click(pictureButton);
    });

    expect(notesThunks.startUploadingImg).toHaveBeenCalledTimes(1);
    expect(notesThunks.startUploadingImg).toHaveBeenCalledWith(file);
  });
});
