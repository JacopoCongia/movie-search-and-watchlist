import { createContext, useState } from "react";
import { getMovies } from "../api";

const SearchContext = createContext();

function SearchContextProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("");

  function handleSubmit(e, text) {
    e.preventDefault();
    if (text) {
      const title = text.replaceAll(" ", "+");
      retrieveMovie(title);
      setCurrentTitle(title);
    }
  }

  async function retrieveMovie(title) {
    setLoading(true);
    setError(null);
    try {
      const data = await getMovies(title);
      setMovies(data.Search);

      if (data.Response === "False") {
        throw new Error("No movies with that title, try again");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SearchContext.Provider
      value={{
        movies,
        setMovies,
        currentTitle,
        loading,
        setLoading,
        error,
        setError,
        handleSubmit
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export { SearchContextProvider };
export default SearchContext;
