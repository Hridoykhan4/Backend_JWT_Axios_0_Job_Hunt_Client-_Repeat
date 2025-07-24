import { useState } from "react";
import useAuthValue from "../../hooks/useAuthValue";
import Social from "../Shared/Social";

const SignIn = () => {
  const { signInUserByEmail, forgetPass } = useAuthValue();
  const [showPass, setShowPass] = useState(false);
  const [inputField, setInputField] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
  });

  const handleSignIn = (e) => {
    e.preventDefault();

    const { email, password } = inputField;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const newError = {};

    if (!email) {
      newError.emailError = "Email Field can not be empty";
    } else if (!emailRegex.test(email)) {
      newError.emailError = "Please enter a valid email";
    }

    if (!password) newError.passwordError = "Pass Field can not be empty";
    if (password.length < 6)
      newError.passwordError = "Must contain 6 or more characters";

    if (Object.keys(newError).length > 0) {
      return setError(newError);
    }

    setError({ emailError: "", passwordError: "" });

    signInUserByEmail(email, password)
      .then(() => {
        alert("Success");
      })
      .catch((err) => console.log(err));

    e.target.reset();
  };

  const handleForgetPassword = () => {
    const { email } = inputField;
    if (email) {
      forgetPass(email)
        .then(() => {
          console.log(`Send`);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleChange = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  return (
    <div className="hero bg-base-200 ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSignIn} className="card-body">
            <h1 className="text-5xl font-bold">Sign In now!</h1>
            <fieldset className="fieldset">
              {error.emailError && (
                <p className="text-red-600 font-semibold">{error.emailError}</p>
              )}
              <label className="label">Email</label>
              <input
                value={inputField.email}
                onChange={handleChange}
                name="email"
                type="email"
                className="input"
                placeholder="Email"
              />
              {error.emailError && (
                <p className="text-red-600 font-semibold">{error.emailError}</p>
              )}
              <label className="label">Password</label>
              <div className="relative">
                <input
                  onChange={handleChange}
                  value={inputField.password}
                  name="password"
                  type={showPass ? "text" : "password"}
                  className="input "
                  placeholder="Password"
                />
                <button
                  onClick={() => setShowPass((prev) => !prev)}
                  className="absolute z-100 right-3 top-2"
                  type="button"
                >
                  {showPass ? "Hide" : "Show"}
                </button>
              </div>

              {error.passwordError && (
                <p className="text-red-600 font-semibold">
                  {error.passwordError}
                </p>
              )}

              <div>
                <button
                  type="button"
                  onClick={handleForgetPassword}
                  className="link link-hover"
                >
                  Forgot password?
                </button>
              </div>
              <button className="btn btn-neutral mt-4">Login</button>
            </fieldset>
          </form>
          <div className="mx-3 mb-1">
            <Social></Social>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
