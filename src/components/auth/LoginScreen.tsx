import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuthentication, useForm } from "../../hooks";
import { RootState } from "../../store/store";

const LoginScreen = () => {
  const { uiReducer: ui } = useSelector((state: RootState) => state);

  const {
    formValues: { email, password },
    handleInputChange,
  } = useForm({
    email: "",
    password: "",
  });

  const { handleGoogleLogin, handleLoginWithEmailAndPassword } =
    useAuthentication();

  return (
    <>
      <h3 className="auth__title">Login</h3>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleLoginWithEmailAndPassword(email, password);
        }}
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
          aria-label="submit-button"
        >
          Login
        </button>

        <hr />
        <div className="auth__social-networks">
          <p>Login with social networks</p>

          <div
            role="button"
            data-testid="google-login-button"
            className="google-btn"
            onClick={handleGoogleLogin}
          >
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
