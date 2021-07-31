import renderer from "react-test-renderer";
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { mockStore, storeCleanActions } from "../../test-utils/mockStore";
import * as authThunks from "../../reducers/authReducer/authThunks";
import { uiActions } from "../../reducers/uiReducer/uiReducer";
import { ValidatorService } from "../../services";
import RegisterScreen from "./RegisterScreen";
import { store } from "../../store/store";

function insertFormValues(
  component: RenderResult<
    typeof import("/home/philip/projects/journal-app/node_modules/@testing-library/dom/types/queries"),
    HTMLElement
  >
) {
  const nameField = component.getByPlaceholderText("Name");
  fireEvent.change(nameField, { target: { value: "testing new user" } });

  const emailField = component.getByPlaceholderText("Email");
  fireEvent.change(emailField, {
    target: { value: "testing_new_user@gmail.com" },
  });

  const passwordField = component.getByPlaceholderText("Password");
  fireEvent.change(passwordField, { target: { value: "123456" } });

  const confirmPasswordField =
    component.getByPlaceholderText("Confirm password");
  fireEvent.change(confirmPasswordField, { target: { value: "123456" } });
}

describe("Test on <RegisterScreen />", () => {
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

  test("should match the snapshot correctly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <RegisterScreen />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("should register a new user", () => {
    jest.spyOn(ValidatorService.prototype, "validateRegisterForm");
    jest.spyOn(authThunks, "startRegister");
    jest.spyOn(uiActions, "setError");

    const component = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    );

    insertFormValues(component);

    const registerButton = component.getByRole("button");

    fireEvent.click(registerButton);

    expect(authThunks.startRegister).toHaveBeenCalledTimes(1);
    expect(authThunks.startRegister).toHaveBeenCalledWith({
      email: "testing_new_user@gmail.com",
      name: "testing new user",
      password: "123456",
      confirmPassword: "123456",
    });

    expect(uiActions.setError).not.toHaveBeenCalled();
    expect(
      ValidatorService.prototype.validateRegisterForm
    ).toHaveBeenCalledTimes(1);
  });

  test("should display an email error", async () => {
    const component = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    );

    insertFormValues(component);

    const emailField = component.getByPlaceholderText("Email");
    const registerButton = component.getByRole("button");

    fireEvent.change(emailField, { target: { value: "" } });
    fireEvent.click(registerButton);

    const errorDiv = component.getByText("Email is required");
    expect(errorDiv).toHaveTextContent("Email is required");

    fireEvent.change(emailField, { target: { value: "emailinvalid@" } });
    fireEvent.click(registerButton);

    const errorDiv2 = component.getByText("Email invalid");
    expect(errorDiv2).toHaveTextContent("Email invalid");
  });

  test("should display a name error", () => {
    const component = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    );

    insertFormValues(component);

    const nameField = component.getByPlaceholderText("Name");
    const registerButton = component.getByRole("button");

    fireEvent.change(nameField, { target: { value: "" } });
    fireEvent.click(registerButton);

    const errorDiv = component.getByText("Name is required");
    expect(errorDiv).toHaveTextContent("Name is required");
  });

  test("should display a password error", () => {
    const component = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    );

    insertFormValues(component);

    const passwordField = component.getByPlaceholderText("Password");
    const button = component.getByRole("button");

    fireEvent.change(passwordField, { target: { value: "" } });
    fireEvent.click(button);

    const errorDiv = component.getByText(
      "Password should be at least 5 characters"
    );

    expect(errorDiv).toHaveTextContent(
      "Password should be at least 5 characters"
    );
  });

  test("should display a confirmPassword error", () => {
    const component = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    );

    insertFormValues(component);

    const confirmPasswordField =
      component.getByPlaceholderText("Confirm password");
    const registerButton = component.getByRole("button");

    fireEvent.change(confirmPasswordField, { target: { value: "" } });
    fireEvent.click(registerButton);

    const errorDiv = component.getByText("Password should match each other");

    expect(errorDiv).toHaveTextContent("Password should match each other");
  });

  test("should display a passwordd error", () => {
    const component = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    );

    insertFormValues(component);

    const registerButton = component.getByRole("button");
    const passwordField = component.getByPlaceholderText("Password");

    fireEvent.change(passwordField, { target: { value: "aasddas" } });
    fireEvent.click(registerButton);

    const errorDiv = component.getByText("Password should match each other");

    expect(errorDiv).toHaveTextContent("Password should match each other");
  });
});
