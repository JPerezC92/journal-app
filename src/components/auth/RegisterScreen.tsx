import { Link } from "react-router-dom";

const RegisterScreen = () => {
  return (
    <>
      <h3 className="auth__title">Register</h3>

      <form>
        <input
          className="auth__input"
          type="name"
          placeholder="Name"
          name="name"
          autoComplete="off"
        />

        <input
          className="auth__input"
          type="email"
          placeholder="Email"
          name="email"
          autoComplete="off"
        />

        <input
          className="auth__input"
          type="password"
          placeholder="Password"
          name="password"
        />

        <input
          className="auth__input"
          type="confirmPassword"
          placeholder="Confirm password"
          name="confirmPassword"
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
