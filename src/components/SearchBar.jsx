import { useState } from "react";

function SearchBar({ handleSubmit }) {
  const [text, setText] = useState("");

  function handleSearchChange(e) {
    e.preventDefault();
    setText(e.target.value);
  }

  return (
    <form onSubmit={(e) => handleSubmit(e, text)}>
      <input
        onChange={(e) => handleSearchChange(e)}
        type="search"
        className="absolute left-[50%] translate-x-[-50%] translate-y-[-45%] text-center w-[66%] h-[40px] rounded outline-none px-2 py-1 font-nunito"
        placeholder="Search for movies..."
        value={text}
      />
    </form>
  );
}

export default SearchBar;
