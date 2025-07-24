import { useState } from "react";
import useAuthValue from "../../hooks/useAuthValue";
import Social from "../Shared/Social";

const Register = () => {
  const { registerUser, updateNameInRegister } = useAuthValue();

  const [inputField, setInputField] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
  });

  const handleRegister = (e) => {
    e.preventDefault();

    const { email, password, name } = inputField;

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

    registerUser(email, password)
      .then(() => {
        updateNameInRegister(name)
          .then(() => {
            // console.log(res.user);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    e.target.reset();
  };

  const handleChange = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  return (
    <div className="hero bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleRegister} className="card-body">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input
                value={inputField.name}
                onChange={handleChange}
                name="name"
                type="text"
                className="input"
                placeholder="Name"
              />
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
              <input
                onChange={handleChange}
                value={inputField.password}
                name="password"
                type="password"
                className="input"
                placeholder="Password"
              />
              {error.passwordError && (
                <p className="text-red-600 font-semibold">
                  {error.passwordError}
                </p>
              )}

              <button className="btn btn-neutral mt-4">Register</button>
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

export default Register;
