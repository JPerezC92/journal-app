import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useForm from "../../hooks/useForm/useForm";
import { RootState } from "../../store/store";
import { Loading, startLogin } from "../../reducers/authReducer";
import { AuthService } from "../../services/AuthService";

const LoginScreen = () => {
  const auth = useSelector((state: RootState) => state.authReducer);

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

  if (auth.loading === Loading.PENDING) return <div>Loading...</div>;

  return (
    <>
      <h3 className="auth__title">Login</h3>

      <form onSubmit={handleSubmit}>
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

        <button className="btn btn-primary btn-block" type="submit">
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

        <pre>{JSON.stringify(formValues, null, 2)}</pre>

        <span>{JSON.stringify(auth.user, null, 2)}</span>
      </form>
    </>
  );
};

export default LoginScreen;
