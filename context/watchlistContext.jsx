import { createContext, useState, useEffect } from "react";
import { getWatchlist, addToDb, removeFromDb } from "../firebaseConfig";

const WatchlistContext = createContext();

function WatchlistContextProvider({ children }) {
  const [watchlist, setWatchlist] = useState([]);

  async function handleAdd(e, movie) {
    // Check if the movie is already in the watchlist
    const inWatchlist = watchlist?.some((el) => {
      return el.imdbID === movie.imdbID;
    });
    e.preventDefault();

    if (!inWatchlist) {
      setWatchlist((prevWatchlist) => {
        return [...prevWatchlist, movie];
      });
      addToDb(movie);
      getSavedWatchlist();
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

  // useEffect(() => {
  //   if (watchlist.length > 0) {
  //     localStorage.setItem("watchlist", JSON.stringify(watchlist));
  //   }
  // }, [watchlist]);

  async function getSavedWatchlist() {
    const savedWatchlist = await getWatchlist();

    setWatchlist(savedWatchlist);
  }

  useEffect(() => {
    getSavedWatchlist();
    // const savedWatchlist = JSON.parse(localStorage.getItem("watchlist"));
  }, []);

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
