import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import validator from "validator";
import useForm from "../../hooks/useForm/useForm";
import { uiActions } from "../../reducers";
import { register } from "../../reducers/authReducer";

import { RootState } from "../../store/store";

const RegisterScreen = () => {
  const { errorMessage } = useSelector((state: RootState) => state.uiReducer);

  const dispatch = useDispatch();

  const { formValues, handleInputChange } = useForm({
    name: "Philip",
    email: "123123@gmail.com",
    password: "123456",
    confirmPassword: "123456",
  });
  const { name, email, password, confirmPassword } = formValues;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isFormValid()) {
      dispatch(register(formValues));
      console.log("formulario correcto");
    }
    console.log(formValues);
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(uiActions.setError("name is required"));

      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(uiActions.setError("email invalid"));

      return false;
    } else if (password !== confirmPassword || password.length < 5) {
      dispatch(
        uiActions.setError(
          "password should be at least 5 characters and match each other"
        )
      );
      return false;
    }

    dispatch(uiActions.removeError());
    return true;
  };

  return (
    <>
      <h3 className="auth__title">Register</h3>

      {errorMessage && <div className="auth__alert-error">{errorMessage}</div>}

      <form onSubmit={handleSubmit}>
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

        <button className="btn btn-primary btn-block mb-5" type="submit">
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
