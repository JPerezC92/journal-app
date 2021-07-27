import renderer, { act } from "react-test-renderer";
import { fireEvent, RenderResult } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../../store/store";
import { render } from "../../test-utils";
import RegisterScreen from "./RegisterScreen";

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
    const { component, store } = render(
      <MemoryRouter>
        <RegisterScreen />
      </MemoryRouter>
    );

    jest.spyOn(store, "dispatch");

    insertFormValues(component);

    const button = component.getByRole("button");
    act(() => {
      fireEvent.click(button);
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  test("should display an email error", () => {
    const { component } = render(
      <MemoryRouter>
        <RegisterScreen />
      </MemoryRouter>
    );

    insertFormValues(component);

    const emailField = component.getByPlaceholderText("Email");
    fireEvent.change(emailField, { target: { value: "" } });

    const button = component.getByRole("button");

    act(() => {
      fireEvent.click(button);
    });
    const errorDiv = component.getByText("Email invalid");

    expect(errorDiv).toHaveTextContent("Email invalid");
  });

  test("should display an name error", () => {
    const { component } = render(
      <MemoryRouter>
        <RegisterScreen />
      </MemoryRouter>
    );

    insertFormValues(component);

    const nameField = component.getByPlaceholderText("Name");
    fireEvent.change(nameField, { target: { value: "" } });

    const button = component.getByRole("button");
    act(() => {
      fireEvent.click(button);
    });

    const errorDiv = component.getByText("Name is required");
    expect(errorDiv).toHaveTextContent("Name is required");
  });

  test("should display a password error", () => {
    const { component } = render(
      <MemoryRouter>
        <RegisterScreen />
      </MemoryRouter>
    );

    insertFormValues(component);

    const passwordField = component.getByPlaceholderText("Password");
    const button = component.getByRole("button");
    fireEvent.change(passwordField, { target: { value: "" } });

    act(() => {
      fireEvent.click(button);
    });

    const errorDiv = component.getByText(
      "Password should be at least 5 characters"
    );

    expect(errorDiv).toHaveTextContent(
      "Password should be at least 5 characters"
    );
  });

  test("should display a confirmPassword error", () => {
    const { component } = render(
      <MemoryRouter>
        <RegisterScreen />
      </MemoryRouter>
    );

    insertFormValues(component);

    const confirmPasswordField =
      component.getByPlaceholderText("Confirm password");
    fireEvent.change(confirmPasswordField, { target: { value: "" } });

    const button = component.getByRole("button");
    act(() => {
      fireEvent.click(button);
    });

    const errorDiv = component.getByText("Password should match each other");

    expect(errorDiv).toHaveTextContent("Password should match each other");
  });

  test("should display a passwordd error", () => {
    const { component } = render(
      <MemoryRouter>
        <RegisterScreen />
      </MemoryRouter>
    );

    insertFormValues(component);

    const passwordField = component.getByPlaceholderText("Password");
    fireEvent.change(passwordField, { target: { value: "aasddas" } });

    const button = component.getByRole("button");
    act(() => {
      fireEvent.click(button);
    });

    const errorDiv = component.getByText("Password should match each other");

    expect(errorDiv).toHaveTextContent("Password should match each other");
  });
});
