import { render } from "../../test-utils";
import { MemoryRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import { authActions } from "../../reducers";

describe("Test on <AppRouter />", () => {
  test("should display login when the user isn't autenticated and main page when is autenticated", async () => {
    const { component, store } = render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );

    expect(await component.findByRole("heading")).toHaveTextContent("Login");

    store.dispatch(
      authActions.login({
        uid: "JKZHKJSDFNBASJKDASdklfhakjh",
        displayName: "Testing",
      })
    );

    const aside = await component.findByRole("complementary");
    const main = await component.findByRole("main");

    expect(aside).toBeInTheDocument();
    expect(aside).toHaveTextContent("Logout");
    expect(main).toHaveTextContent("Select something");
  });
});
