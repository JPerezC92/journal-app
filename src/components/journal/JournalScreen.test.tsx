import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { notesActions } from "../../reducers";
import { store } from "../../store/store";
import { mockStore } from "../../test-utils/mockStore";
import JournalScreen from "./JournalScreen";

describe("Test on <JournalScreen />", () => {
  test("should match the snapshot correctly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <JournalScreen />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("should render <NothingSelected />", async () => {
    const component = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <JournalScreen />
        </MemoryRouter>
      </Provider>
    );

    const aside = component.getByRole("complementary");

    expect(aside).toBeInTheDocument();
    expect(component.container).toHaveTextContent("Select something");
    expect(component.container).toHaveTextContent("or create an entry");
  });

  test("should render <NoteScreen />", async () => {
    const component = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <JournalScreen />
        </MemoryRouter>
      </Provider>
    );

    mockStore.dispatch(
      notesActions.setNoteActive({
        id: "1",
        title: "Test title",
        body: "Test body",
        date: 1626208415067,
        imageUrl:
          "https://res.cloudinary.com/jperezc92/image/upload/v1627759301/ezxhoydkvqaidpcf6loq.png",
      })
    );
    const titleField = component.getByPlaceholderText("Some awesome title");
    const img = component.getByRole("img");
    const aside = component.getByRole("complementary");

    expect(aside).toBeInTheDocument();
    expect(titleField).toHaveValue("Test title");
    expect(component.container).toHaveTextContent("Test body");
    expect(img).toHaveAttribute(
      "src",
      "https://res.cloudinary.com/jperezc92/image/upload/v1627759301/ezxhoydkvqaidpcf6loq.png"
    );
  });
});
