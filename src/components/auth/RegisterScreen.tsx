import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks";
import { uiActions } from "../../reducers";
import { startRegister } from "../../reducers/authReducer";
import { ValidatorService } from "../../services";

import { RootState } from "../../store/store";

const RegisterScreen = () => {
  const validatorService = new ValidatorService();
  const { errorMessage } = useSelector((state: RootState) => state.uiReducer);
  const ui = useSelector((state: RootState) => state.uiReducer);

  const dispatch = useDispatch();

  const { formValues, handleInputChange } = useForm({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = formValues;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { success, errorMessage } =
      validatorService.validateRegisterForm(formValues);

    if (success) {
      dispatch(startRegister(formValues));
    } else {
      dispatch(uiActions.setError(errorMessage));
    }
  };

  return (
    <>
      <h3 className="auth__title">Register</h3>

      {errorMessage && <div className="auth__alert-error">{errorMessage}</div>}

      <form
        aria-label="form"
        onSubmit={handleSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <input
          className="auth__input"
          type="name"
          placeholder="Name"
          name="name"
          autoComplete="off"
          onChange={handleInputChange}
          value={name}
        />

        <input
          className="auth__input"
          type="email"
          placeholder="Email"
          name="email"
          autoComplete="off"
          onChange={handleInputChange}
          value={email}
        />

        <input
          className="auth__input"
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleInputChange}
          value={password}
        />

        <input
          className="auth__input"
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          onChange={handleInputChange}
          value={confirmPassword}
        />

        <button
          className="btn btn-primary btn-block mb-5"
          type="submit"
          disabled={ui.loading}
        >
          Register
        </button>

        <Link className="link" to="/auth/login">
          Already registered?
        </Link>
      </form>
    </>
  );
};

export default RegisterScreen;
