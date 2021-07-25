import { cleanup, fireEvent, render } from "@testing-library/react";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import { store } from "../../store/store";
import { Provider } from "react-redux";
import LoginScreen from "./LoginScreen";

store.dispatch = jest.fn();

describe("Test on <LoginScreen />", () => {
  let component = render(
    <Provider store={store}>
      <MemoryRouter>
        <LoginScreen />
      </MemoryRouter>
    </Provider>
  );

  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginScreen />
        </MemoryRouter>
      </Provider>
    );
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

  test("Sign in with google should fire a dispatch event with a function as parameter", async () => {
    const button = component.getByTestId("google-login-button");

    expect(button).toHaveTextContent("Sign in with google");

    fireEvent.click(button);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
  });

  test("Login should fire a dispatch event with a function as parameter", async () => {
    const button = component.getAllByText("Login")[1];

    expect(button).toHaveTextContent("Login");

    fireEvent.click(button);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
  });
});
