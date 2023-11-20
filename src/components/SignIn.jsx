import { useState } from "react";
import useAuth from "../../hooks/use-auth";

function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { logIn, logInWithGoogle, error } = useAuth();

  function handleFormChange(e) {
    const { value, name } = e.target;

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value
      };
    });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    if (formData.email && formData.password) {
      logIn(formData);
      setFormData({ email: "", password: "" });
    }
  }

  return (
    <div className="flex flex-col gap-3 w-[66%] min-[1500px]:w-[33%]">
      <h1 className="text-white m-auto text-[1.5rem]">Sign In</h1>
      <button
        className="text-center rounded relative hover:opacity-90 w-[100%] text-white bg-[#4285F4] flex items-center justify-between"
        onClick={() => logInWithGoogle()}
      >
        <img src="/google-sign-in.svg" />
        <p className="font-medium absolute left-[50%] w-[200px] ml-[-100px]">
          Sign in With Google
        </p>
      </button>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-2"
      >
        <input
          className="px-4 py-2 text-center rounded"
          type="email"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleFormChange}
          placeholder="john@doe.com"
        />
        <input
          className="px-4 py-2 text-center rounded w-full"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleFormChange}
          placeholder="password"
        />
        <button
          type="submit"
          className="text-white border rounded px-4 py-2 w-full hover:bg-neutral-700"
        >
          Log In
        </button>
        {error ? (
          <h1 className="text-red-500 text-center mt-3">
            Error: {error?.code.replace("auth/", "")}
          </h1>
        ) : (
          ""
        )}
      </form>
    </div>
  );
}

export default SignIn;
