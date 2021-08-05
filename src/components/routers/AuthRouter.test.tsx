import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { store } from "../../store/store";
import AuthRouter from "./AuthRouter";

describe("Test on <AuthRouter />", () => {
  test("should match the snapshot rendering <LoginScreen />", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <AuthRouter />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("should match the snapshot rendering <RegisterScreen />", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/auth/register"]}>
            <AuthRouter />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
