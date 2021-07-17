import validator from "validator";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export class ValidatorService {
  private errorMessage: string = "";

  private setErrorMessage(message: string) {
    this.errorMessage = message;
  }

  validateRegisterForm({
    name,
    email,
    password,
    confirmPassword,
  }: RegisterForm): { success: boolean; errorMessage: string | null } {
    if (!this.validateName(name)) return this.validationError();
    if (!this.validateEmail(email)) return this.validationError();
    if (!this.validatePasswordLength(password)) return this.validationError();
    if (!this.validatePasswordMatch(password, confirmPassword))
      return this.validationError();

    return this.validationSuccess();
  }

  private validateName(name: string) {
    this.errorMessage = "Name is required";
    return name.trim().length > 0;
  }

  private validateEmail(email: string) {
    this.setErrorMessage("Email invalid");
    return validator.isEmail(email);
  }

  private validatePasswordLength(password: string) {
    this.setErrorMessage("Password should be at least 5 characters");
    return password.length >= 5;
  }

  private validatePasswordMatch(password: string, confirmPassword: string) {
    this.setErrorMessage("Password should match each other");
    return password === confirmPassword;
  }

  private validationSuccess() {
    return { success: true, errorMessage: null };
  }

  private validationError() {
    return { success: false, errorMessage: this.errorMessage };
  }
}
