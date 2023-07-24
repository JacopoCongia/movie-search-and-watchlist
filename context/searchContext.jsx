import { createContext, useState } from "react";
import { getMovies } from "../api";
import { useSearchParams } from "react-router-dom";

const SearchContext = createContext();

function SearchContextProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  function handleSubmit(e, text) {
    e.preventDefault();
    if (text) {
      const title = text.replaceAll(" ", "+");
      retrieveMovie(title);
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
      console.log(err);
    } finally {
      setLoading(false);
      setSearchParams(`search=${title}`);
    }
  }

  return (
    <SearchContext.Provider
      value={{
        movies,
        setMovies,
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
