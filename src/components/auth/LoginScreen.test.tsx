import { cleanup, fireEvent, render } from "@testing-library/react";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { mockStore } from "../../test-utils/mockStore";
import LoginScreen from "./LoginScreen";
import * as authHook from "../../hooks/useAuthentication";

describe("Test on <LoginScreen />", () => {
  const mockFunctions = {
    handleLogout: jest.fn(),
    handleGoogleLogin: jest.fn(),
    handleLoginWithEmailAndPassword: jest.fn(),
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  test("should match the snapshot correctly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <LoginScreen />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("should call handleGoogleLogin", async () => {
    jest
      .spyOn(authHook, "useAuthentication")
      .mockImplementation(() => mockFunctions);

    const component = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <LoginScreen />
        </MemoryRouter>
      </Provider>
    );

    const button = component.getByTestId("google-login-button");

    fireEvent.click(button);

    expect(button).toHaveTextContent("Sign in with google");
    expect(mockFunctions.handleGoogleLogin).toHaveBeenCalledTimes(1);
  });

  test("should call handleLoginWithEmailAndPassword with the email and password", async () => {
    jest
      .spyOn(authHook, "useAuthentication")
      .mockImplementation(() => mockFunctions);

    const component = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <LoginScreen />
        </MemoryRouter>
      </Provider>
    );

    const button = component.getAllByText("Login")[1];
    const emailField = component.getByPlaceholderText("Email");
    const passwordField = component.getByPlaceholderText("Password");

    expect(button).toHaveTextContent("Login");

    fireEvent.change(emailField, { target: { value: "test@testing.com" } });
    fireEvent.change(passwordField, { target: { value: "123456" } });

    fireEvent.click(button);

    expect(mockFunctions.handleLoginWithEmailAndPassword).toHaveBeenCalledTimes(
      1
    );
    expect(mockFunctions.handleLoginWithEmailAndPassword).toHaveBeenCalledWith(
      "test@testing.com",
      "123456"
    );
  });
});
