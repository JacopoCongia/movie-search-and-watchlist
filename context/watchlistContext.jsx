import { createContext, useState, useEffect } from "react";
import { getWatchlist, addToDb, removeFromDb } from "../firebase";
import useAuth from "../hooks/use-auth";

const WatchlistContext = createContext();

function WatchlistContextProvider({ children }) {
  const [watchlist, setWatchlist] = useState([]);
  const { currentUser } = useAuth();

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
      addToDb(movie, currentUser);
    }
    getSavedWatchlist();
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
    removeFromDb(movieId, currentUser);
  }

  async function getSavedWatchlist() {
    if (currentUser) {
      const savedWatchlist = await getWatchlist(currentUser);
      const sortedWatchlist = savedWatchlist.sort((a, b) => {
        return b.dateAdded - a.dateAdded;
      });
      setWatchlist(sortedWatchlist);
    }
  }

  useEffect(() => {
    getSavedWatchlist();
  }, [currentUser]);

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
