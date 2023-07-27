import { useState } from "react";
import useAuth from "../../hooks/use-auth";

function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { logIn, error } = useAuth();

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

  // if (error) {
  //   return <h1 className="text-white">{error.message}</h1>;
  // }

  return (
    <div className="flex flex-col gap-3 w-[50%] m-auto">
      <h1 className="text-white m-auto text-[1.5rem]">Sign In</h1>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-2"
      >
        <input
          className="px-4 py-2 text-center rounded w-full"
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
          Sign In
        </button>
        {error ? (
          <h1 className="text-red-500 text-center mt-3">{error?.message}</h1>
        ) : (
          ""
        )}
      </form>
    </div>
  );
}

export default SignIn;
