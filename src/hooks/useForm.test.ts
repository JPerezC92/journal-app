import { act, renderHook } from "@testing-library/react-hooks";
import { useForm } from "./useForm";

function fillFormValues(handleInputChange: Function) {
  handleInputChange({
    target: { name: "name", value: "Philip" },
  } as any);

  handleInputChange({
    target: { name: "email", value: "testing@email.com" },
  } as any);

  handleInputChange({
    target: { name: "password", value: "123123" },
  } as any);

  handleInputChange({
    target: { name: "confirmPassword", value: "123123" },
  } as any);
}

describe("Test on useForm", () => {
  const mockFormValues = {
    name: "Philip",
    email: "testing@email.com",
    password: "123123",
    confirmPassword: "123123",
  };

  test("should match the returned values from useForm", () => {
    const { result } = renderHook(() => useForm(mockFormValues));

    expect(result.current).toEqual({
      formValues: mockFormValues,
      handleInputChange: expect.any(Function),
      reset: expect.any(Function),
    });
  });

  test("handleInputChange should update the form values", () => {
    const formValues = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    const { result } = renderHook(() => useForm(formValues));

    act(() => {
      fillFormValues(result.current.handleInputChange);
    });

    expect(result.current.formValues).toEqual(mockFormValues);
  });

  test("reset should update the formValues to the initial state", () => {
    const formValues = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    const { result } = renderHook(() => useForm(formValues));

    act(() => {
      fillFormValues(result.current.handleInputChange);
    });

    expect(result.current.formValues).toEqual(mockFormValues);

    act(() => {
      result.current.reset();
    });

    expect(result.current.formValues).toEqual(formValues);
  });
});
