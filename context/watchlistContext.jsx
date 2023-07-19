import { createContext, useState, useEffect } from "react";

const WatchlistContext = createContext();

function WatchlistContextProvider({ children }) {
  const [watchlist, setWatchlist] = useState([]);

  function handleAdd(e, movie) {
    // Check if the movie is already in the watchlist
    const inWatchlist = watchlist?.some((el) => {
      return el.imdbID === movie.imdbID;
    });

    e.preventDefault();
    if (!inWatchlist) {
      setWatchlist((prevWatchlist) => {
        return [...prevWatchlist, movie];
      });
    }
  }

  function handleRemove(e, movie) {
    e.preventDefault();

    setWatchlist(
      watchlist.filter((item) => {
        return item.imdbID !== movie.imdbID;
      })
    );
  }

  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem("watchlist"));
    setWatchlist(savedWatchlist);
  }, [setWatchlist]);

  return (
    <WatchlistContext.Provider
      value={{ watchlist, setWatchlist, handleAdd, handleRemove }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export { WatchlistContextProvider };
export default WatchlistContext;
