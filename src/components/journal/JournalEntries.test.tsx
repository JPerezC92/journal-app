import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { Note, notesActions } from "../../reducers";
import { store } from "../../store/store";
import JournalEntries from "./JournalEntries";

const notesMock: Note[] = [
  {
    id: "1",
    title: "Test title 1",
    body: "Test body 1",
    date: 1626208415067,
    imageUrl:
      "https://res.cloudinary.com/jperezc92/image/upload/v1627759301/ezxhoydkvqaidpcf6loq.png",
  },
  {
    id: "2",
    title: "Test title 2",
    body: "Test body 2",
    date: 1626989415067,
    imageUrl:
      "https://res.cloudinary.com/jperezc92/image/upload/v1627759301/ezxhoydkvqaidpcf6loq.png",
  },
];

describe("Test on <JournalEntries />", () => {
  test("should match the snapshot correctly", () => {
    store.dispatch(notesActions.setNotes(notesMock));
    const tree = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <JournalEntries />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
