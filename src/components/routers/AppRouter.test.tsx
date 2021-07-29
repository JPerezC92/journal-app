import { cleanup, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { mockStore, storeCleanActions } from "../../test-utils/mockStore";
import { AuthService } from "../../services";
import { authActions, startLogin } from "../../reducers";
import * as notesThunks from "../../reducers/notesReducer/notesThunks";
import AppRouter from "./AppRouter";

describe("Test on <AppRouter />", () => {
  let dispatch = mockStore.dispatch;

  beforeEach(() => {
    dispatch = mockStore.dispatch;
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  afterEach(() => {
    dispatch(storeCleanActions.clean());
    cleanup();
  });

  test("should call authActions.login if user is authenticated", async () => {
    jest.spyOn(authActions, "login");
    jest.spyOn(notesThunks, "startLoadingNotes");

    const component = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );

    const loadingScreen = await component.findByText("Loading...");
    expect(loadingScreen).not.toBeInTheDocument();

    const loginScreen = await component.findByRole("heading");

    expect(loginScreen).toHaveTextContent("Login");

    // Authenticating user
    await dispatch(
      startLogin(() =>
        AuthService.loginWithEmailAndPassword("test@testing.com", "123456")
      )
    );

    expect(authActions.login).toHaveBeenCalledTimes(1);
    expect(notesThunks.startLoadingNotes).toHaveBeenCalledTimes(1);
    expect(notesThunks.startLoadingNotes).toHaveBeenCalledWith(
      "UO0hZ06iY3V0yfn5IAQZXGPmPun1"
    );

    expect(component.container).toHaveTextContent("Logout");
    expect(component.container).toHaveTextContent("testingAccount");
    expect(component.container).toHaveTextContent("New entry");
    expect(component.container).toHaveTextContent("Select something");
  });
});
