import { createContext, useState } from "react";
import { getWatchlist, addToDb, removeFromDb } from "../firebaseConfig";

const WatchlistContext = createContext();

function WatchlistContextProvider({ children }) {
  const [watchlist, setWatchlist] = useState([]);

  async function handleAdd(e, movie) {
    e.preventDefault();

    // Check if the movie is already in the watchlist
    const inWatchlist = watchlist?.some((el) => {
      return el.imdbID === movie.imdbID;
    });

    if (!inWatchlist) {
      setWatchlist((prevWatchlist) => {
        return [...prevWatchlist, movie];
      });
      addToDb(movie);
    }
  }

  function handleRemove(e, movie) {
    e.preventDefault();
    let movieId;
    watchlist.forEach((item) => {
      if (item.imdbID === movie.imdbID) {
        movieId = item.id;
      }
    });

    setWatchlist(
      watchlist.filter((item) => {
        return item.imdbID !== movie.imdbID;
      })
    );
    removeFromDb(movieId);
  }

  async function getSavedWatchlist() {
    const savedWatchlist = await getWatchlist();
    const sortedWatchlist = savedWatchlist.sort((a, b) => {
      return b.dateAdded - a.dateAdded;
    });

    setWatchlist(sortedWatchlist);
  }

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        setWatchlist,
        handleAdd,
        handleRemove,
        getSavedWatchlist
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export { WatchlistContextProvider };
export default WatchlistContext;
