import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useForm from "../../hooks/useForm/useForm";
import { RootState } from "../../store/store";
import { startLogin } from "../../reducers/authReducer";
import { AuthService } from "../../services";

const LoginScreen = () => {
  const { uiReducer: ui } = useSelector((state: RootState) => state);

  let errorMessage = null;

  const dispatch = useDispatch();

  const { formValues, handleInputChange } = useForm({
    email: "",
    password: "",
  });

  const { email, password } = formValues;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(
      startLogin(() => AuthService.loginWithEmailAndPassword(email, password))
    );
  };

  const handleGoogleLogin = () => {
    dispatch(startLogin(AuthService.loginWithFirebase));
  };

  return (
    <>
      <h3 className="auth__title">Login</h3>

      {errorMessage && <div>{errorMessage}</div>}

      <form
        onSubmit={handleSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
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

        <button
          className="btn btn-primary btn-block"
          type="submit"
          disabled={ui.loading}
        >
          Login
        </button>

        <hr />
        <div className="auth__social-networks">
          <p>Login with social networks</p>

          <div className="google-btn" onClick={handleGoogleLogin}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>

        <Link className="link" to="/auth/register">
          Create a new account
        </Link>
      </form>
    </>
  );
};

export default LoginScreen;
