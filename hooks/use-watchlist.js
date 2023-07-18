import { useContext } from "react";
import WatchlistContext from "../context/watchlistContext";

function useWatchlist() {
  return useContext(WatchlistContext);
}

export default useWatchlist;
