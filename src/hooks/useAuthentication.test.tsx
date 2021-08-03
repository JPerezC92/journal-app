import { renderHook, act, cleanup } from "@testing-library/react-hooks";
import { Provider } from "react-redux";
import * as authThunks from "../reducers/authReducer/authThunks";
import { AuthService } from "../services";
import { mockStore } from "../test-utils/mockStore";
import { useAuthentication } from "./useAuthentication";

describe("Test on useAuthentication", () => {
  const wrapper: React.FC = ({ children }) => (
    <Provider store={mockStore}>{children}</Provider>
  );

  beforeEach(() => {
    jest.restoreAllMocks();
    cleanup();
  });

  test("should return 3 function handlers", () => {
    const { result } = renderHook(() => useAuthentication(), { wrapper });

    expect(result.current).toEqual({
      handleGoogleLogin: expect.any(Function),
      handleLoginWithEmailAndPassword: expect.any(Function),
      handleLogout: expect.any(Function),
    });
  });

  test("handleGoogleLogin should call startLogin with AuthService.loginWithGoogle", () => {
    jest.spyOn(mockStore, "dispatch").mockImplementation(() => jest.fn());
    jest.spyOn(authThunks, "startLogin");
    const { result } = renderHook(() => useAuthentication(), { wrapper });

    act(() => {
      result.current.handleGoogleLogin();
    });

    expect(authThunks.startLogin).toHaveBeenCalledTimes(1);
    expect(authThunks.startLogin).toHaveBeenCalledWith(
      AuthService.loginWithGoogle
    );
  });

  test("handleLoginWithEmailAndPassword should call startLogin with AuthService.loginWithEmailAndPassword", () => {
    jest.spyOn(mockStore, "dispatch").mockImplementation(() => jest.fn());
    jest.spyOn(authThunks, "startLogin");
    const { result } = renderHook(() => useAuthentication(), { wrapper });

    act(() => {
      result.current.handleLoginWithEmailAndPassword(
        "test@example.com",
        "123123"
      );
    });

    expect(authThunks.startLogin).toHaveBeenCalledTimes(1);
    expect(authThunks.startLogin).toHaveBeenCalledWith(expect.any(Function));
  });

  test("handleLogout should call startLogout", () => {
    jest.spyOn(mockStore, "dispatch").mockImplementation(() => jest.fn());
    jest.spyOn(authThunks, "startLogout");
    const { result } = renderHook(() => useAuthentication(), { wrapper });

    act(() => {
      result.current.handleLogout();
    });

    expect(authThunks.startLogout).toHaveBeenCalledTimes(1);
  });
});
