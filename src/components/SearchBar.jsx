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
        className="absolute left-[50%] h-[40px] w-[80%] translate-x-[-50%] translate-y-[-50%] rounded px-2 py-1 text-center font-nunito outline-none min-[500px]:w-[66%]"
        placeholder="Search for movies..."
        value={text}
      />
    </form>
  );
}

export default SearchBar;
