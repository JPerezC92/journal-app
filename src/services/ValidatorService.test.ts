import { ValidatorService } from "./ValidatorService";

describe("Test on ValidatorService", () => {
  const formValues = {
    name: "test",
    email: "testing@gmail.com",
    password: "123123",
    confirmPassword: "123123",
  };
  const validatorService = new ValidatorService();

  test("success should be true and errorMessage should be null", () => {
    const { success, errorMessage } =
      validatorService.validateRegisterForm(formValues);

    expect(success).toBeTruthy();
    expect(errorMessage).toBeNull();
  });

  test("errorMessage should contain 'Name is required'", () => {
    const { success, errorMessage } = validatorService.validateRegisterForm({
      ...formValues,
      name: "",
    });

    expect(success).toBeFalsy();
    expect(errorMessage).toBe("Name is required");
  });

  test("errorMessage should contain 'Email is required'", () => {
    const { success, errorMessage } = validatorService.validateRegisterForm({
      ...formValues,
      email: "",
    });

    expect(success).toBeFalsy();
    expect(errorMessage).toBe("Email is required");
  });

  test("errorMessage should contain 'Email invalid'", () => {
    const { success, errorMessage } = validatorService.validateRegisterForm({
      ...formValues,
      email: "21321",
    });

    expect(success).toBeFalsy();
    expect(errorMessage).toBe("Email invalid");
  });

  test("errorMessage should contain 'Password should be at least 5 characters'", () => {
    const { success, errorMessage } = validatorService.validateRegisterForm({
      ...formValues,
      password: "",
    });

    expect(success).toBeFalsy();
    expect(errorMessage).toBe("Password should be at least 5 characters");
  });

  test("errorMessage should contain 'Password should match each other'", () => {
    const { success, errorMessage } = validatorService.validateRegisterForm({
      ...formValues,
      password: "123654",
    });

    expect(success).toBeFalsy();
    expect(errorMessage).toBe("Password should match each other");
  });
});
