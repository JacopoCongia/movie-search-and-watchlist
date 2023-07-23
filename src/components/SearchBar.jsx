import { useState } from "react";
import useSearch from "../../hooks/use-search";

function SearchBar() {
  const { handleSubmit } = useSearch();
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
        className="absolute left-[50%] top-[100%] h-[40px] w-[80%] translate-x-[-50%] translate-y-[-50%] rounded px-2 py-1 text-center font-nunito outline-none min-[500px]:w-[66%]"
        placeholder="Search for movies..."
        value={text}
      />
    </form>
  );
}

export default SearchBar;
