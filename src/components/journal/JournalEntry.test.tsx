import { fireEvent, render } from "@testing-library/react";
import renderer from "react-test-renderer";
import { format } from "date-fns";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { Note, notesActions } from "../../reducers";
import { store } from "../../store/store";
import { mockStore } from "../../test-utils/mockStore";
import JournalEntry from "./JournalEntry";

describe("Test on <JournalEntry />", () => {
  const noteMock: Note = {
    id: "1",
    title: "Test title",
    body: "Test body",
    date: new Date().getDate(),
    imageUrl:
      "https://res.cloudinary.com/jperezc92/image/upload/v1627759301/ezxhoydkvqaidpcf6loq.png",
  };

  test("should match the snapshot correctly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <JournalEntry note={noteMock} />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("should call notesActions.setNoteActive", () => {
    jest.spyOn(notesActions, "setNoteActive");

    const component = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <JournalEntry note={noteMock} />
        </MemoryRouter>
      </Provider>
    );

    const entry = component.getByRole("listitem");

    fireEvent.click(entry);

    expect(notesActions.setNoteActive).toHaveBeenCalledTimes(1);
    expect(notesActions.setNoteActive).toHaveBeenCalledWith(noteMock);
  });

  test("should contain the note information", async () => {
    const component = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <JournalEntry note={noteMock} />
        </MemoryRouter>
      </Provider>
    );
    const entry = component.getByRole("listitem");

    expect(await component.findByRole("img")).toBeInTheDocument();
    expect(entry).toHaveTextContent(noteMock.title);
    expect(entry).toHaveTextContent(noteMock.body);
    expect(entry).toHaveTextContent(format(noteMock.date, "eeee"));
    expect(entry).toHaveTextContent(format(noteMock.date, "do"));
  });
});
