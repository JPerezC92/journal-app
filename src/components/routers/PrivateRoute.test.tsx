import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

describe("Test on <PrivateRoute />", () => {
  test("Should contain text Authenticated User", () => {
    const component = render(
      <MemoryRouter>
        <PrivateRoute
          isAuthenticated={true}
          path="/"
          Component={() => {
            return <span>Authenticated User</span>;
          }}
        />
      </MemoryRouter>
    );

    expect(component.container).toHaveTextContent("Authenticated User");
  });

  test("shouldn't contain text Authenticated User", () => {
    const component = render(
      <MemoryRouter>
        <PrivateRoute
          isAuthenticated={false}
          path="/"
          Component={() => {
            return <span>Authenticated User</span>;
          }}
        />
      </MemoryRouter>
    );

    expect(component.container).not.toHaveTextContent("Authenticated User");
  });
});
