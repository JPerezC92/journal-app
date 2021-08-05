import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PublicRoute from "./PublicRoute";

describe("Test on <PublicRoute />", () => {
  test("shouldn't contain text LoginScreen", () => {
    const component = render(
      <MemoryRouter initialEntries={["/auth"]}>
        <PublicRoute
          isAuthenticated={true}
          path="/auth"
          Component={() => {
            return <span>LoginScreen</span>;
          }}
        />
      </MemoryRouter>
    );

    expect(component.container).not.toHaveTextContent("LoginScreen");
  });

  test("shouldn contain text LoginScreen", async () => {
    const component = render(
      <MemoryRouter initialEntries={["/auth"]}>
        <PublicRoute
          isAuthenticated={false}
          path="/auth"
          Component={() => {
            return <span>LoginScreen</span>;
          }}
        />
      </MemoryRouter>
    );

    expect(component.container).toHaveTextContent("LoginScreen");
  });
});
