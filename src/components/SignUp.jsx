import { useState } from "react";
import useAuth from "../../hooks/use-auth";
import { Navigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { createAccount, error, currentUser } = useAuth();

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
      createAccount(formData);
    }
  }

  return (
    <div className="flex flex-col gap-3 mt-[3em] m-auto w-[66%] min-[1500px]:w-[33%]">
      <h1 className="text-white m-auto text-[1.5rem]">Create an Account</h1>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-2"
      >
        <input
          className="px-4 py-2 text-center rounded w-full block"
          type="email"
          name="email"
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
          Sign Up
        </button>
        {error ? (
          <h1 className="text-red-500 text-center mt-3">
            Error: {error?.code.replace("auth/", "")}
          </h1>
        ) : (
          ""
        )}
      </form>
      {currentUser && <Navigate to="/account" />}
    </div>
  );
}

export default SignUp;
