import renderer from "react-test-renderer";
import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../../store/store";
import { mockStore, storeCleanActions } from "../../test-utils/mockStore";
import * as notesThunks from "../../reducers/notesReducer/notesThunks";
import * as hooks from "../../hooks/useAuthentication";
import Sidebar from "./Sidebar";

describe("Test on <Sidebar />", () => {
  let dispatch = mockStore.dispatch;
  beforeEach(() => {
    dispatch = mockStore.dispatch;
  });

  afterEach(() => {
    dispatch(storeCleanActions.clean());
    jest.restoreAllMocks();
    cleanup();
  });

  test("should match the snapshot correctly", () => {
    let tree;
    renderer.act(() => {
      tree = renderer
        .create(
          <Provider store={store}>
            <MemoryRouter>
              <Sidebar />
            </MemoryRouter>
          </Provider>
        )
        .toJSON();
    });

    expect(tree).toMatchSnapshot();
  });

  test("should call startNewNote", async () => {
    jest.spyOn(notesThunks, "startNewNote");

    const component = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Sidebar />
        </MemoryRouter>
      </Provider>
    );

    const newEntryButton = component.getByLabelText("button");

    act(() => {
      fireEvent.click(newEntryButton);
    });

    expect(notesThunks.startNewNote).toHaveBeenCalledTimes(1);
  });

  test("should calld handleLogout", async () => {
    const handleLogout = jest.fn();
    jest
      .spyOn(hooks, "useAuthentication")
      .mockImplementation(() => ({ handleLogout }));

    const component = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Sidebar />
        </MemoryRouter>
      </Provider>
    );

    const logoutButton = component.getByRole("button");

    act(() => {
      fireEvent.click(logoutButton);
    });

    expect(handleLogout).toHaveBeenCalledTimes(1);
  });
});
